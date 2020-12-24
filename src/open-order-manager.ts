import {
    OrderId,
    Config,
    OpenOrder,
    Length,
    OPEN, CLOSE,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';

interface Frozen {
    margin: Big;
    position: Big;
    length: Length;
}

class OpenOrderManager extends Map<OrderId, OpenOrder>{
    private frozens = new Map<OrderId, Frozen>();

    constructor(private config: Config) {
        super();
    }

    public addOrder(order: OpenOrder): [OpenOrder, Frozen] {
        if (order.quantity.eq(0)) return [
            order,
            {
                margin: new Big(0),
                position: new Big(0),
                length: order.side * order.operation,
            }
        ];

        this.set(order.id, order);
        const dollarVolume = this.config.calcDollarVolume(
            order.price, order.quantity);
        const frozen: Frozen = {
            margin: order.operation === OPEN
                ? dollarVolume.div(this.config.leverage)
                    .round(this.config.CURRENCY_DP, RoundingMode.RoundUp)
                : new Big(0),
            position: order.operation === CLOSE
                ? order.quantity
                : new Big(0),
            length: order.side * order.operation,
        };
        this.frozens.set(order.id, frozen);
        return [order, frozen];
    }

    public takeOrder(
        oid: OrderId,
        volume: Big,
        dollarVolume: Big,
    ): Frozen {
        const order = this.get(oid);
        const frozen = this.frozens.get(oid)!;
        if (!order) throw new Error('Order not found.');
        if (volume.gt(order.quantity))
            throw new Error('volume > quantity');

        const thawed: Frozen = {
            margin: this.calcReleasedMargin(
                order.quantity, frozen.margin, volume, dollarVolume,
            ),
            position: volume,
            length: order.side * order.operation,
        };

        frozen.margin = frozen.margin.minus(thawed.margin);
        frozen.position = frozen.position.minus(thawed.position);

        order.quantity = order.quantity.minus(volume);
        if (order.quantity.eq(0)) {
            this.delete(oid);
            this.frozens.delete(oid);
        }

        return thawed;
    }

    public removeOrder(oid: OrderId): Frozen {
        const order = this.get(oid);
        const frozen = this.frozens.get(oid)!;
        if (!order) return {
            margin: new Big(0),
            position: new Big(0),
            length: 1,
        }

        const thawed: Frozen = {
            margin: frozen.margin,
            position: frozen.position,
            length: order.side * order.operation,
        };

        this.delete(oid);
        this.frozens.delete(oid);

        return thawed;
    }

    private calcReleasedMargin(
        quantity: Big,
        frozenMargin: Big,
        volume: Big,
        dollarVolume: Big,
    ): Big {
        let thawedMargin = dollarVolume.div(this.config.leverage)
            .round(this.config.CURRENCY_DP);
        if (thawedMargin.gt(frozenMargin) || volume.eq(quantity))
            thawedMargin = frozenMargin;
        return thawedMargin;
    }
}

export {
    OpenOrderManager as default,
    OpenOrderManager,
    Frozen,
}

import {
    OrderId,
    Config,
    OpenOrder,
    LimitOrder,
    Length,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';

interface Frozen {
    margin: Big;
    position: Big;
    length: Length;
}

class OpenOrderManager {
    private openOrders = new Map<OrderId, OpenOrder>();
    private frozens = new Map<OrderId, Frozen>();

    constructor(private config: Config) { }

    public addOrder(
        oid: OrderId,
        limit: LimitOrder,
    ): [OpenOrder, Frozen] {
        const order = { ...limit, id: oid };
        if (order.quantity.eq(0)) return [
            order,
            {
                margin: new Big(0),
                position: new Big(0),
                length: order.open ? order.side : -order.side,
            }
        ];

        this.openOrders.set(oid, order);
        const dollarVolume = this.config.calcDollarVolume(
            order.price, order.quantity);
        const info: Frozen = {
            margin: order.open
                ? dollarVolume.div(this.config.leverage)
                    .round(this.config.CURRENCY_DP, RoundingMode.RoundUp)
                : new Big(0),
            position: order.open
                ? new Big(0)
                : order.quantity,
            length: order.open ? order.side : -order.side,
        };
        this.frozens.set(oid, info);
        return [order, info];
    }

    public take(
        oid: OrderId,
        volume: Big,
        dollarVolume: Big,
    ): Frozen {
        const order = this.openOrders.get(oid)!;
        const frozen = this.frozens.get(oid)!;
        if (!order) throw ('Order not found.');

        const thawed: Frozen = {
            margin: this.calcReleasedMargin(
                order.quantity, frozen.margin, volume, dollarVolume,
            ),
            position: volume,
            length: order.open ? order.side : -order.side,
        };

        frozen.margin = frozen.margin.minus(thawed.margin);
        frozen.position = frozen.position.minus(thawed.position);

        order.quantity = order.quantity.minus(volume);
        if (order.quantity.eq(0)) {
            this.openOrders.delete(oid);
            this.frozens.delete(oid);
        }

        return thawed;
    }

    public delete(oid: OrderId): Frozen {
        const order = this.openOrders.get(oid)!;
        const frozen = this.frozens.get(oid)!;
        if (!order) return {
            margin: new Big(0),
            position: new Big(0),
            length: 1,
        }

        const thawed: Frozen = {
            margin: frozen.margin,
            position: frozen.position,
            length: order.open ? order.side : -order.side,
        };

        this.openOrders.delete(oid);
        this.frozens.delete(oid);

        return thawed;
    }

    public getOpenOrders() {
        return this.openOrders;
    }

    private calcReleasedMargin(
        quantity: Big,
        frozenMargin: Big,
        volume: Big,
        dollarVolume: Big,
    ): Big {
        let thawedMargin = dollarVolume.div(this.config.leverage)
            .round(this.config.CURRENCY_DP);
        if (
            thawedMargin.gt(frozenMargin) ||
            volume.eq(quantity)
        ) thawedMargin = frozenMargin;
        return thawedMargin;
    }
}

export {
    OpenOrderManager as default,
    OpenOrderManager,
    Frozen,
}

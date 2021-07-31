import {
    OrderId,
    Config,
    Length,
    Operation,
    OpenMaker,
} from './interfaces';
import Big from 'big.js';
import assert = require('assert');

interface Frozen {
    balance: Big;
    position: Big;
    length: Length;
}

class OpenMakerManager extends Map<OrderId, OpenMaker>{
    private frozens = new Map<OrderId, Frozen>();

    constructor(
        private config: Config,
        private getSettlementPrice: () => Big,
        private getLatestPrice: () => Big,
    ) {
        super();
    }

    public addOrder(order: OpenMaker): Frozen {
        const frozen: Frozen = {
            balance: order.operation === Operation.OPEN
                ? this.config.calcFrozenMargin(
                    this.config,
                    order,
                    this.getSettlementPrice(),
                    this.getLatestPrice(),
                ).round(this.config.CURRENCY_DP)
                : new Big(0),
            position: order.operation === Operation.CLOSE
                ? order.unfilled
                : new Big(0),
            length: order.length,
        };
        if (order.unfilled.gt(0)) {
            this.set(order.id, order);
            this.frozens.set(order.id, frozen);
        }
        return frozen;
    }

    public takeOrder(
        oid: OrderId,
        volume: Big,
        dollarVolume: Big,
    ): Frozen {
        const order = this.get(oid);
        assert(order);
        const frozen = this.frozens.get(oid)!;
        assert(volume.lte(order.unfilled));

        const thawed: Frozen = {
            balance: order.operation === Operation.OPEN
                ? this.calcThawedBalance(
                    order.unfilled, frozen.balance, volume, dollarVolume,
                ) : new Big(0),
            position: order.operation === Operation.CLOSE
                ? volume
                : new Big(0),
            length: order.length,
        };

        frozen.balance = frozen.balance.minus(thawed.balance);
        frozen.position = frozen.position.minus(thawed.position);

        order.filled = order.filled.plus(volume);
        order.unfilled = order.unfilled.minus(volume);
        if (order.unfilled.eq(0)) {
            this.delete(oid);
            this.frozens.delete(oid);
        }

        return thawed;
    }

    public removeOrder(oid: OrderId): Frozen | null {
        const order = this.get(oid);
        const frozen = this.frozens.get(oid)!;
        if (!order) return null;

        const thawed: Frozen = {
            balance: frozen.balance,
            position: frozen.position,
            length: order.length,
        };

        this.delete(oid);
        this.frozens.delete(oid);

        return thawed;
    }

    private calcThawedBalance(
        unfilled: Big,
        frozenBalance: Big,
        volume: Big,
        dollarVolume: Big,
    ): Big {
        let thawedMargin = dollarVolume.div(this.config.LEVERAGE)
            .round(this.config.CURRENCY_DP);
        if (thawedMargin.gt(frozenBalance) || volume.eq(unfilled))
            thawedMargin = frozenBalance;
        return thawedMargin;
    }
}

export {
    OpenMakerManager as default,
    OpenMakerManager,
    Frozen,
}

import {
    Assets,
    Length,
    Config,
    Snapshot,
} from './interfaces';
import Big from 'big.js';

class AutoAssets implements Assets {
    public position: {
        [length: number]: Big;
    };
    public balance: Big;
    public cost: {
        [length: number]: Big;
    };
    public frozenBalance: Big;
    public frozenPosition: {
        [length: number]: Big;
    };

    constructor(
        protected config: Config,
        snapshot: Snapshot,
        private getSettlementPrice: () => Big,
        private getLatestPrice: () => Big,
    ) {
        this.balance = snapshot.balance;
        this.frozenBalance = new Big(0);
        this.frozenPosition = {
            [Length.LONG]: new Big(0),
            [Length.SHORT]: new Big(0),
        };
        this.position = {
            [Length.LONG]: new Big(0), [Length.SHORT]: new Big(0),
        };
        this.cost = {
            [Length.LONG]: new Big(0), [Length.SHORT]: new Big(0),
        };
    }

    protected staticMargin = new Big(0);
    public get margin(): Big {
        return this.config.calcMargin(
            this.config,
            this,
            this.getSettlementPrice(),
            this.getLatestPrice(),
            this.staticMargin,
        ).round(this.config.CURRENCY_DP);
    }

    public get available(): Big {
        return this.balance
            .minus(this.margin)
            .minus(this.frozenBalance);
    }

    public get closable() {
        return {
            [Length.LONG]: this.position[Length.LONG]
                .minus(this.frozenPosition[Length.LONG]),
            [Length.SHORT]: this.position[Length.SHORT]
                .minus(this.frozenPosition[Length.SHORT]),
        };
    }

    public toJSON(): Assets {
        return {
            balance: this.balance,
            cost: this.cost,
            margin: this.margin,
            position: this.position,
            frozenBalance: this.frozenBalance,
            frozenPosition: this.frozenPosition,
            available: this.available,
            closable: this.closable,
        }
    }
}

export {
    AutoAssets as default,
    AutoAssets,
}

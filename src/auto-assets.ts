import {
    ExAssets,
    LONG, SHORT,
    Config,
} from './interfaces';
import Big from 'big.js';

class AutoAssets implements ExAssets {
    public position: {
        [length: number]: Big;
    };
    public balance: Big;
    public cost: {
        [length: number]: Big;
    };
    public frozenMargin: Big;
    public frozenPosition: {
        [length: number]: Big;
    };

    constructor(
        protected config: Config,
        private getSettlementPrice: () => Big,
        private getLatestPrice: () => Big,
    ) {
        this.balance = config.initialBalance;
        this.frozenMargin = new Big(0);
        this.frozenPosition = {
            [LONG]: new Big(0),
            [SHORT]: new Big(0),
        };
        this.position = {
            [LONG]: new Big(0), [SHORT]: new Big(0),
        };
        this.cost = {
            [LONG]: new Big(0), [SHORT]: new Big(0),
        };
    }

    protected autoMargin = new Big(0);
    public get margin(): Big {
        return this.config.calcMargin(
            this.config,
            this,
            this.getSettlementPrice(),
            this.getLatestPrice(),
            this.autoMargin,
        ).round(this.config.CURRENCY_DP);
    }

    public get reserve(): Big {
        return this.balance
            .minus(this.margin)
            .minus(this.frozenMargin);
    }

    public get closable() {
        return {
            [LONG]: this.position[LONG]
                .minus(this.frozenPosition[LONG]),
            [SHORT]: this.position[SHORT]
                .minus(this.frozenPosition[SHORT]),
        };
    }

    public toJSON(): ExAssets {
        return {
            balance: this.balance,
            cost: this.cost,
            margin: this.margin,
            position: this.position,
            frozenMargin: this.frozenMargin,
            frozenPosition: this.frozenPosition,
            reserve: this.reserve,
            closable: this.closable,
        }
    }
}

export {
    AutoAssets as default,
    AutoAssets,
}

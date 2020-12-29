import {
    Assets,
    LONG, SHORT,
    InitialAssets,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';


class AutoAssets implements Assets {
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
    public time: number;
    private leverage: number;
    private CURRENCY_DP: number;

    constructor(
        initialAssets: InitialAssets,
        leverage: number,
        CURRENCY_DP: number,
    ) {
        ({
            balance: this.balance,
            position: this.position,
            cost: this.cost,
            time: this.time,
        } = initialAssets);
        this.frozenMargin = new Big(0);
        this.frozenPosition = {
            [LONG]: new Big(0),
            [SHORT]: new Big(0),
        };
        this.leverage = leverage;
        this.CURRENCY_DP = CURRENCY_DP;
    }

    public get margin(): Big {
        return new Big(0)
            .plus(this.cost[LONG])
            .plus(this.cost[SHORT])
            .div(this.leverage)
            .round(this.CURRENCY_DP, RoundingMode.RoundUp);
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

    public toJSON(): Assets {
        return {
            balance: this.balance,
            cost: this.cost,
            margin: this.margin,
            position: this.position,
            frozenMargin: this.frozenMargin,
            frozenPosition: this.frozenPosition,
            reserve: this.reserve,
            closable: this.closable,
            time: this.time,
        }
    }
}

export {
    AutoAssets as default,
    AutoAssets,
    InitialAssets,
}

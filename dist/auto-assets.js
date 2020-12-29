import { LONG, SHORT, } from './interfaces';
import Big from 'big.js';
class AutoAssets {
    constructor(initialAssets, leverage, CURRENCY_DP) {
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
    get margin() {
        return new Big(0)
            .plus(this.cost[LONG])
            .plus(this.cost[SHORT])
            .div(this.leverage)
            .round(this.CURRENCY_DP, 3 /* RoundUp */);
    }
    get reserve() {
        return this.balance
            .minus(this.margin)
            .minus(this.frozenMargin);
    }
    get closable() {
        return {
            [LONG]: this.position[LONG]
                .minus(this.frozenPosition[LONG]),
            [SHORT]: this.position[SHORT]
                .minus(this.frozenPosition[SHORT]),
        };
    }
    toJSON() {
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
        };
    }
}
export { AutoAssets as default, AutoAssets, };
//# sourceMappingURL=auto-assets.js.map
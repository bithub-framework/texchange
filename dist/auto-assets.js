import { LONG, SHORT, } from './interfaces';
import Big from 'big.js';
class AutoAssets {
    constructor(config, getSettlementPrice, getLatestPrice) {
        this.config = config;
        this.getSettlementPrice = getSettlementPrice;
        this.getLatestPrice = getLatestPrice;
        this.autoMargin = new Big(0);
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
    get margin() {
        return this.config.calcMargin(this.config, this, this.getSettlementPrice(), this.getLatestPrice(), this.autoMargin).round(this.config.CURRENCY_DP);
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
        };
    }
}
export { AutoAssets as default, AutoAssets, };
//# sourceMappingURL=auto-assets.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMarketSpec = void 0;
const assert = require("assert");
/**
 * 默认正向合约
 */
class DefaultMarketSpec {
    constructor(context) {
        this.PRICE_DP = 2;
        this.QUANTITY_DP = 3;
        this.CURRENCY_DP = 2;
        this.MARKET_NAME = 'test';
        this.TICK_SIZE = new context.Data.H('.5');
    }
    quantity(price, dollarVolume) {
        assert(price.neq(0));
        return dollarVolume.div(price);
    }
    dollarVolume(price, quantity) {
        return price.times(quantity);
    }
}
exports.DefaultMarketSpec = DefaultMarketSpec;
//# sourceMappingURL=default-market-spec.js.map
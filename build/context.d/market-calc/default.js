"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMarketCalc = void 0;
const assert = require("assert");
/**
 * 默认正向合约
 */
class DefaultMarketCalc {
    quantity(price, dollarVolume) {
        assert(price.gt(0));
        return dollarVolume.div(price);
    }
    dollarVolume(price, quantity) {
        return price.times(quantity);
    }
}
exports.DefaultMarketCalc = DefaultMarketCalc;
//# sourceMappingURL=default.js.map
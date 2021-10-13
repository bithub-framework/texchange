"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsValidation = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
class MethodsValidation {
    constructor(core) {
        this.core = core;
    }
    validateOrder(order) {
        this.formatCorrect(order);
        this.assertEnoughPosition(order);
        this.assertEnoughAvailable(order);
    }
    assertEnoughPosition(order) {
        if (order.operation === interfaces_1.Operation.CLOSE)
            assert(order.unfilled.lte(new big_js_1.default(0)
                .plus(this.core.states.assets.position[order.length])
                .minus(this.core.states.margin.frozenPosition[order.length])));
    }
    assertEnoughAvailable(order) {
        if (order.operation === interfaces_1.Operation.OPEN)
            assert(new big_js_1.default(0)
                .plus(this.core.calculation.balanceToFreeze(order))
                .plus(this.core.calculation.dollarVolume(order.price, order.unfilled).times(this.core.config.TAKER_FEE_RATE)).round(this.core.config.CURRENCY_DP)
                .lte(this.core.states.margin.available));
    }
    formatCorrect(order) {
        assert(order.price.eq(order.price.round(this.core.config.PRICE_DP)));
        assert(order.price.mod(this.core.config.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.core.config.QUANTITY_DP)));
        assert(order.length === interfaces_1.Length.LONG || order.length === interfaces_1.Length.SHORT);
        assert(order.operation === interfaces_1.Operation.OPEN || order.operation === interfaces_1.Operation.CLOSE);
        assert(order.operation * order.length === order.side);
    }
}
exports.MethodsValidation = MethodsValidation;
//# sourceMappingURL=validation.js.map
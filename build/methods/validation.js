"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsValidation = void 0;
const interfaces_1 = require("../interfaces");
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
            assert(order.unfilled.lte(this.core.states.assets.position[order.length]
                .minus(this.core.states.margin.frozen.position[order.length])));
    }
    assertEnoughAvailable(order) {
        if (order.operation === interfaces_1.Operation.OPEN) {
            const frozen = this.core.calculation.toFreeze(order);
            assert(frozen.balance[interfaces_1.Length.LONG]
                .plus(frozen.balance[interfaces_1.Length.SHORT])
                .plus(this.core.calculation.dollarVolume(order.price, order.unfilled).times(this.core.config.TAKER_FEE_RATE)).round(this.core.config.CURRENCY_DP)
                .lte(this.core.states.margin.available));
        }
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsValidation = void 0;
const interfaces_1 = require("../interfaces");
const assert = require("assert");
const big_js_1 = require("big.js");
class MethodsValidation {
    constructor(core) {
        this.core = core;
    }
    validateOrder(order) {
        this.validateFormat(order);
        this.assertEnough(order);
    }
    /**
     * Overridable
     * @param order Plain object.
     */
    assertEnough(order) {
        const { makers } = this.core.states;
        makers.appendOrder({ ...order, behind: new big_js_1.default(0) });
        const closable = this.core.interfaces.instant.getClosable();
        const enoughPosition = closable[interfaces_1.Length.LONG].gte(0) &&
            closable[interfaces_1.Length.SHORT].gte(0);
        const enoughBalance = this.core.interfaces.instant.getAvailable()
            .gte(this.core.calculation.dollarVolume(order.price, order.unfilled).times(Math.max(this.core.config.TAKER_FEE_RATE, 0)).round(this.core.config.CURRENCY_DP));
        makers.removeOrder(order.id);
        assert(enoughPosition && enoughBalance);
    }
    validateFormat(order) {
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
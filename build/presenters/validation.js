"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const interfaces_1 = require("../interfaces");
const assert = require("assert");
const big_js_1 = require("big.js");
class Validation {
    constructor(hub) {
        this.hub = hub;
    }
    validateOrder(order) {
        this.validateFormat(order);
        this.validateQuantity(order);
    }
    /**
     * Can be called only in consistent states
     */
    validateQuantity(order) {
        const { makers } = this.hub.models;
        const closable = this.hub.views.instant.getClosable();
        makers.appendOrder({ ...order, behind: new big_js_1.default(0) });
        try {
            const enoughPosition = closable[interfaces_1.Length.LONG].gte(0) &&
                closable[interfaces_1.Length.SHORT].gte(0);
            assert(enoughPosition);
            const enoughBalance = this.hub.views.instant.getAvailable()
                .gte(this.hub.context.calculation.dollarVolume(order.price, order.unfilled).times(Math.max(this.hub.context.config.TAKER_FEE_RATE, 0)).round(this.hub.context.config.CURRENCY_DP));
            assert(enoughBalance);
        }
        finally {
            makers.removeOrder(order.id);
        }
    }
    validateFormat(order) {
        assert(order.price.eq(order.price.round(this.hub.context.config.PRICE_DP)));
        assert(order.price.mod(this.hub.context.config.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.hub.context.config.QUANTITY_DP)));
        assert(order.length === interfaces_1.Length.LONG || order.length === interfaces_1.Length.SHORT);
        assert(order.operation === interfaces_1.Operation.OPEN || order.operation === interfaces_1.Operation.CLOSE);
        assert(order.operation * order.length === order.side);
    }
}
exports.Validation = Validation;
//# sourceMappingURL=validation.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateOrder = void 0;
const secretary_like_1 = require("secretary-like");
const assert = require("assert");
class ValidateOrder {
    constructor(tasks, context, models, broadcast) {
        this.tasks = tasks;
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    validateOrder(order) {
        this.validateFormat(order);
        this.validateQuantity(order);
    }
    validateQuantity(order) {
        const { makers } = this.models;
        const closable = this.tasks.getClosable.getClosable();
        makers.appendOrder(order, new this.context.Data.H(0));
        try {
            const enoughPosition = closable[secretary_like_1.Length.LONG].gte(0) &&
                closable[secretary_like_1.Length.SHORT].gte(0);
            assert(enoughPosition);
            const enoughBalance = this.tasks.getAvailable.getAvailable()
                .gte(this.context.calc.dollarVolume(order.price, order.unfilled).times(Math.max(this.context.config.account.TAKER_FEE_RATE, 0)).round(this.context.config.market.CURRENCY_DP));
            assert(enoughBalance);
        }
        finally {
            makers.removeOrder(order.id);
        }
    }
    validateFormat(order) {
        assert(order.price.eq(order.price.round(this.context.config.market.PRICE_DP)));
        assert(order.price.mod(this.context.config.market.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.context.config.market.QUANTITY_DP)));
        assert(order.length === secretary_like_1.Length.LONG || order.length === secretary_like_1.Length.SHORT);
        assert(order.operation === secretary_like_1.Operation.OPEN || order.operation === secretary_like_1.Operation.CLOSE);
        assert(order.operation * order.length === order.side);
    }
}
exports.ValidateOrder = ValidateOrder;
//# sourceMappingURL=validate-order.js.map
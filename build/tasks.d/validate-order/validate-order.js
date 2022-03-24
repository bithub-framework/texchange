"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateOrder = void 0;
const interfaces_1 = require("interfaces");
const assert = require("assert");
class ValidateOrder {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
        this.OrderId = new interfaces_1.TexchangeOrderIdStatic();
        this.OpenOrder = new interfaces_1.TexchangeOpenOrderStatic(this.context.H, this.OrderId);
    }
    validateOrder(order) {
        this.validateFormat(order);
        this.validateQuantity(order);
    }
    validateQuantity(order) {
        const { makers } = this.models;
        const closable = this.tasks.getClosable.getClosable();
        makers.appendOrder({
            ...this.OpenOrder.copy(order),
            behind: this.context.H.from(0),
        });
        try {
            const enoughPosition = closable[interfaces_1.Length.LONG].gte(0) &&
                closable[interfaces_1.Length.SHORT].gte(0);
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
        assert(order.length === interfaces_1.Length.LONG || order.length === interfaces_1.Length.SHORT);
        assert(order.operation === interfaces_1.Operation.OPEN || order.operation === interfaces_1.Operation.CLOSE);
        assert(order.operation * order.length === order.side);
    }
}
exports.ValidateOrder = ValidateOrder;
//# sourceMappingURL=validate-order.js.map
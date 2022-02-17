"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ordering = void 0;
const events_1 = require("events");
const validation_1 = require("./validation");
const taking_1 = require("./taking");
const making_1 = require("./making");
const big_js_1 = require("big.js");
class Ordering extends events_1.EventEmitter {
    constructor(context, models, stages, validation, taking, making) {
        super();
        this.context = context;
        this.models = models;
        this.stages = stages;
        this.validation = validation;
        this.taking = taking;
        this.making = making;
    }
    makeOrder(order) {
        const openOrder = {
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: ++this.models.progress.userOrderCount,
            filled: new big_js_1.default(0),
            unfilled: order.quantity,
        };
        this.stages.progress = true;
        return this.makeOpenOrder(openOrder);
    }
    makeOpenOrder(order) {
        const trades = this.taking.orderTakes(order);
        this.validation.validateOrder(order);
        this.making.orderMakes(order);
        if (trades.length) {
            this.emit('pushTrades', trades);
            this.emit('pushOrderbook');
            this.emit('pushBalances');
            this.emit('pushPositions');
        }
        return order;
    }
    cancelOrder(order) {
        return this.cancelOpenOrder(order);
    }
    cancelOpenOrder(order) {
        const { makers } = this.models;
        let filled = makers.get(order.id)?.filled;
        if (typeof filled === 'undefined')
            filled = order.quantity;
        else
            makers.tryRemoveOrder(order.id);
        this.stages.makers = true;
        return {
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: order.id,
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }
    amendOrder(amendment) {
        const oldOrder = this.cancelOpenOrder(amendment);
        const newOrder = {
            price: amendment.newPrice,
            filled: oldOrder.filled,
            unfilled: amendment.newUnfilled,
            quantity: amendment.newUnfilled.plus(oldOrder.filled),
            id: amendment.id,
            side: amendment.side,
            length: amendment.length,
            operation: amendment.operation,
        };
        this.validation.validateOrder(newOrder);
        return this.makeOpenOrder(newOrder);
    }
}
exports.Ordering = Ordering;
Ordering.involved = [
    'progress', 'makers', 'book',
    ...taking_1.Taking.involved,
    ...making_1.Making.involved,
    ...validation_1.Validation.involved,
];
//# sourceMappingURL=ordering.js.map
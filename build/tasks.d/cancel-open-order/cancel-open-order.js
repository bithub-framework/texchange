"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelOpenOrder = void 0;
class CancelOpenOrder {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    cancelOpenOrder(order) {
        const { makers } = this.models;
        let filled;
        try {
            filled = makers.getOrder(order.id).filled;
            makers.forcedlyRemoveOrder(order.id);
        }
        catch (err) {
            filled = order.quantity;
        }
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
}
exports.CancelOpenOrder = CancelOpenOrder;
//# sourceMappingURL=cancel-open-order.js.map
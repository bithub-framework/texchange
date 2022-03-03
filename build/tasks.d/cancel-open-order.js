"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelOpenOrder = void 0;
const task_1 = require("./task");
class CancelOpenOrder extends task_1.Task {
    constructor(context, models, tasks) {
        super(context, models, tasks);
        this.context = context;
        this.models = models;
        this.tasks = tasks;
    }
    cancelOpenOrder(order) {
        const { makers } = this.models;
        let filled;
        try {
            filled = makers.getOrder(order.id).filled;
            makers.tryRemoveOrder(order.id);
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelOrder = void 0;
class CancelOrder {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    cancelOrder(order) {
        return this.tasks.cancelOpenOrder.cancelOpenOrder(order);
    }
}
exports.CancelOrder = CancelOrder;
//# sourceMappingURL=cancel-order.js.map
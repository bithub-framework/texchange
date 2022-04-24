"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeOrder = void 0;
class MakeOrder {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    makeOrder(order) {
        return this.tasks.makeOpenOrder.makeOpenOrder({
            ...order,
            id: ++this.models.progress.userOrderCount,
            filled: new this.context.H(0),
            unfilled: order.quantity,
        });
    }
}
exports.MakeOrder = MakeOrder;
//# sourceMappingURL=make-order.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeOrder = void 0;
const use_case_1 = require("../use-case");
class MakeOrder extends use_case_1.UseCase {
    constructor(context, models, broadcast, tasks) {
        super();
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    makeOrder(order) {
        const openOrder = {
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: ++this.models.progress.userOrderCount,
            filled: this.context.H.from(0),
            unfilled: order.quantity,
        };
        return this.tasks.makeOpenOrder.makeOpenOrder(openOrder);
    }
}
exports.MakeOrder = MakeOrder;
//# sourceMappingURL=make-order.js.map
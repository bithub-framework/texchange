"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOpenOrders = void 0;
const use_case_1 = require("./use-case");
class GetOpenOrders extends use_case_1.UseCase {
    constructor(context, models, broadcast, tasks) {
        super();
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    getOpenOrders() {
        const openOrders = [...this.models.makers];
        return openOrders.map(order => ({
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: order.id,
            filled: order.filled,
            unfilled: order.unfilled,
        }));
    }
}
exports.GetOpenOrders = GetOpenOrders;
//# sourceMappingURL=get-open-orders.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeOrder = void 0;
const use_case_1 = require("./use-case");
const big_js_1 = require("big.js");
class MakeOrder extends use_case_1.UseCase {
    constructor(context, models, tasks) {
        super(context, models, tasks);
        this.context = context;
        this.models = models;
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
            filled: new big_js_1.default(0),
            unfilled: order.quantity,
        };
        return this.tasks.makeOpenOrder.makeOpenOrder(openOrder);
    }
}
exports.MakeOrder = MakeOrder;
//# sourceMappingURL=make-order.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelOrder = void 0;
const use_case_1 = require("./use-case");
class CancelOrder extends use_case_1.UseCase {
    constructor(context, models, tasks) {
        super(context, models, tasks);
        this.context = context;
        this.models = models;
        this.tasks = tasks;
    }
    cancelOrder(order) {
        return this.tasks.cancelOpenOrder.cancelOpenOrder(order);
    }
}
exports.CancelOrder = CancelOrder;
//# sourceMappingURL=cancel-order.js.map
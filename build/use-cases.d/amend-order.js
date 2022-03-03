"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmendOrder = void 0;
const use_case_1 = require("./use-case");
class AmendOrder extends use_case_1.UseCase {
    constructor(context, models, tasks) {
        super(context, models, tasks);
        this.context = context;
        this.models = models;
        this.tasks = tasks;
    }
    amendOrder(amendment) {
        const oldOrder = this.tasks.cancelOpenOrder.cancelOpenOrder(amendment);
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
        this.tasks.validateOrder.validateOrder(newOrder);
        return this.tasks.makeOpenOrder.makeOpenOrder(newOrder);
    }
}
exports.AmendOrder = AmendOrder;
//# sourceMappingURL=amend-order.js.map
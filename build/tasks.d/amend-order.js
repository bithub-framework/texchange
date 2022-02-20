"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmendOrder = void 0;
const initialize_stages_1 = require("../initialize-stages");
class AmendOrder {
    constructor(context, models, controllers) {
        this.context = context;
        this.models = models;
        this.controllers = controllers;
        this.involved = [
            ...this.controllers.makeOpenOrder.involved,
            ...this.controllers.cancelOpenOrder.involved,
        ];
    }
    amendOrder(amendment) {
        (0, initialize_stages_1.initializeStages)(this.involved);
        const oldOrder = this.controllers.cancelOpenOrder.cancelOpenOrder(amendment);
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
        this.controllers.validateOrder.validateOrder(newOrder);
        return this.controllers.makeOpenOrder.makeOpenOrder(newOrder);
    }
}
exports.AmendOrder = AmendOrder;
//# sourceMappingURL=amend-order.js.map
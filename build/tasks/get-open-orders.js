"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOpenOrders = void 0;
const initialize_stages_1 = require("./initialize-stages");
class GetOpenOrders {
    constructor(context, models, controllers) {
        this.context = context;
        this.models = models;
        this.controllers = controllers;
        this.involved = [];
    }
    getOpenOrders() {
        (0, initialize_stages_1.initializeStages)(this.involved);
        const openOrders = [...this.models.makers.values()];
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
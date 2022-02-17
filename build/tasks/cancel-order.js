"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelOrder = void 0;
const initialize_stages_1 = require("./initialize-stages");
class CancelOrder {
    constructor(context, models, controllers) {
        this.context = context;
        this.models = models;
        this.controllers = controllers;
        this.involved = [
            ...this.controllers.cancelOpenOrder.involved,
        ];
    }
    cancelOrder(order) {
        (0, initialize_stages_1.initializeStages)(this.involved);
        return this.controllers.cancelOpenOrder.cancelOpenOrder(order);
    }
}
exports.CancelOrder = CancelOrder;
//# sourceMappingURL=cancel-order.js.map
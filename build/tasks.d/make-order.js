"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeOrder = void 0;
const initialize_stages_1 = require("./initialize-stages");
const big_js_1 = require("big.js");
class MakeOrder {
    constructor(context, models, controllers) {
        this.context = context;
        this.models = models;
        this.controllers = controllers;
        this.involved = [
            this.models.progress,
            ...this.controllers.makeOpenOrder.involved,
        ];
    }
    makeOrder(order) {
        (0, initialize_stages_1.initializeStages)(this.involved);
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
        this.models.progress.stage = true;
        return this.controllers.makeOpenOrder.makeOpenOrder(openOrder);
    }
}
exports.MakeOrder = MakeOrder;
//# sourceMappingURL=make-order.js.map
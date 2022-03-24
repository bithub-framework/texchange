"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelOpenOrder = void 0;
const interfaces_1 = require("interfaces");
class CancelOpenOrder {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
        this.OrderId = new interfaces_1.TexchangeOrderIdStatic();
        this.OpenOrder = new interfaces_1.TexchangeOpenOrderStatic(this.context.H, this.OrderId);
    }
    cancelOpenOrder(order) {
        const { makers } = this.models;
        let filled;
        try {
            filled = makers.getOrder(order.id).filled;
            makers.forcedlyRemoveOrder(order.id);
        }
        catch (err) {
            filled = order.quantity;
        }
        return {
            ...this.OpenOrder.copy(order),
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }
}
exports.CancelOpenOrder = CancelOpenOrder;
//# sourceMappingURL=cancel-open-order.js.map
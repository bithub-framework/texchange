"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelOpenOrder = void 0;
class CancelOpenOrder {
    constructor(context, models) {
        this.context = context;
        this.models = models;
        this.involved = [
            this.models.makers,
        ];
    }
    cancelOpenOrder(order) {
        const { makers } = this.models;
        let filled = makers.get(order.id)?.filled;
        if (typeof filled === 'undefined')
            filled = order.quantity;
        else
            makers.tryRemoveOrder(order.id);
        makers.stage = true;
        return {
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: order.id,
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }
}
exports.CancelOpenOrder = CancelOpenOrder;
//# sourceMappingURL=cancel-open-order.js.map
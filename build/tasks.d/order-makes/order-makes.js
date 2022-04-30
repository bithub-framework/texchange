"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMakes = void 0;
class OrderMakes {
    constructor(tasks, context, models, broadcast) {
        this.tasks = tasks;
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    orderMakes(order) {
        const makers = this.models.book.getBook()[order.side];
        let behind = new this.context.Data.H(0);
        for (const maker of makers)
            if (maker.price.eq(order.price))
                behind = behind.plus(maker.quantity);
        this.models.makers.appendOrder(order, behind);
    }
}
exports.OrderMakes = OrderMakes;
//# sourceMappingURL=order-makes.js.map
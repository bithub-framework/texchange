"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMakes = void 0;
const interfaces_1 = require("interfaces");
class OrderMakes {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
        this.OrderId = new interfaces_1.TexchangeOrderIdStatic();
        this.OpenOrder = new interfaces_1.TexchangeOpenOrderStatic(this.context.H, this.OrderId);
    }
    orderMakes(order) {
        const openMaker = {
            ...this.OpenOrder.copy(order),
            behind: this.context.H.from(0),
        };
        const makers = this.models.book.getBook()[order.side];
        for (const maker of makers)
            if (maker.price.eq(openMaker.price))
                // TODO addBehind()
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        this.models.makers.appendOrder(openMaker);
    }
}
exports.OrderMakes = OrderMakes;
//# sourceMappingURL=order-makes.js.map
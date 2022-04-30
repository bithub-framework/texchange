"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeOpenOrder = void 0;
const interfaces_1 = require("interfaces");
class MakeOpenOrder {
    constructor(tasks, context, models, broadcast) {
        this.tasks = tasks;
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.OpenOrder = new interfaces_1.OpenOrderStatic(this.context.H);
    }
    makeOpenOrder(order) {
        this.tasks.validateOrder.validateOrder(order);
        const $order = this.OpenOrder.copy(order);
        const trades = this.tasks.orderTakes.$orderTakes($order);
        this.tasks.orderMakes.orderMakes($order);
        if (trades.length) {
            this.broadcast.emit('trades', trades);
            this.broadcast.emit('orderbook', this.models.book.getBook());
            this.broadcast.emit('balances', this.tasks.getBalances.getBalances());
            this.broadcast.emit('positions', this.tasks.getPositions.getPositions());
        }
        return $order;
    }
}
exports.MakeOpenOrder = MakeOpenOrder;
//# sourceMappingURL=make-open-order.js.map
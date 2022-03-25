"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeOpenOrder = void 0;
const interfaces_1 = require("interfaces");
class MakeOpenOrder {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
        this.OrderId = new interfaces_1.TexchangeOrderIdStatic();
        this.OpenOrder = new interfaces_1.TexchangeOpenOrderStatic(this.context.H, this.OrderId);
    }
    makeOpenOrder(order) {
        this.tasks.validateOrder.validateOrder(order);
        const { trades, maker, } = this.tasks.orderTakes.orderTakes(order);
        this.tasks.orderMakes.orderMakes(maker);
        if (trades.length) {
            this.broadcast.emit('trades', trades);
            this.broadcast.emit('orderbook', this.models.book.getBook());
            this.broadcast.emit('balances', this.tasks.getBalances.getBalances());
            this.broadcast.emit('positions', this.tasks.getPositions.getPositions());
        }
        return this.OpenOrder.copy(maker);
    }
}
exports.MakeOpenOrder = MakeOpenOrder;
//# sourceMappingURL=make-open-order.js.map
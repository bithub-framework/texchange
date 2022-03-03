"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeOpenOrder = void 0;
const task_1 = require("./task");
class MakeOpenOrder extends task_1.Task {
    constructor(context, models, tasks) {
        super(context, models, tasks);
        this.context = context;
        this.models = models;
        this.tasks = tasks;
    }
    makeOpenOrder(order) {
        this.tasks.validateOrder.validateOrder(order);
        const trades = this.tasks.orderTakes.orderTakes(order);
        this.tasks.orderMakes.orderMakes(order);
        if (trades.length) {
            this.context.broadcast.emit('trades', trades);
            this.context.broadcast.emit('orderbook', this.models.book.getBook());
            this.context.broadcast.emit('balances', this.tasks.getBalances.getBalances());
            this.context.broadcast.emit('positions', this.tasks.getPositions.getPositions());
        }
        return order;
    }
}
exports.MakeOpenOrder = MakeOpenOrder;
//# sourceMappingURL=make-open-order.js.map
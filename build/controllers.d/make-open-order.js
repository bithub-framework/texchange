"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeOpenOrder = void 0;
const events_1 = require("events");
class MakeOpenOrder extends events_1.EventEmitter {
    constructor(context, models, validateOrder, orderTakes, orderMakes, getBalances, getPositions) {
        super();
        this.context = context;
        this.models = models;
        this.validateOrder = validateOrder;
        this.orderTakes = orderTakes;
        this.orderMakes = orderMakes;
        this.getBalances = getBalances;
        this.getPositions = getPositions;
        this.involved = [
            ...this.validateOrder.involved,
            ...this.orderTakes.involved,
            ...this.orderMakes.involved,
            ...this.getBalances.involved,
            ...this.getPositions.involved,
        ];
    }
    makeOpenOrder(order) {
        const trades = this.orderTakes.orderTakes(order);
        this.validateOrder.validateOrder(order);
        this.orderMakes.orderMakes(order);
        if (trades.length) {
            this.context.broadcast.emit('trades', trades);
            this.context.broadcast.emit('orderbook', this.models.book.getBook());
            this.context.broadcast.emit('balances', this.getBalances.getBalances());
            this.context.broadcast.emit('positions', this.getPositions.getPositions());
        }
        return order;
    }
}
exports.MakeOpenOrder = MakeOpenOrder;
//# sourceMappingURL=make-open-order.js.map
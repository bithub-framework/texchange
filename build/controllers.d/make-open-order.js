"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeOpenOrder = void 0;
const events_1 = require("events");
class MakeOpenOrder extends events_1.EventEmitter {
    constructor(context, models, validation, taking, making) {
        super();
        this.context = context;
        this.models = models;
        this.validation = validation;
        this.taking = taking;
        this.making = making;
        this.involved = [
            ...this.validation.involved,
            ...this.taking.involved,
            ...this.making.involved,
        ];
    }
    makeOpenOrder(order) {
        const trades = this.taking.orderTakes(order);
        this.validation.validateOrder(order);
        this.making.orderMakes(order);
        if (trades.length) {
            this.emit('pushTrades', trades);
            this.emit('pushOrderbook');
            this.emit('pushBalances');
            this.emit('pushPositions');
        }
        return order;
    }
}
exports.MakeOpenOrder = MakeOpenOrder;
//# sourceMappingURL=make-open-order.js.map
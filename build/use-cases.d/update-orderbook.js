"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseOrderbookStatic = exports.UpdateOrderbook = void 0;
const interfaces_1 = require("interfaces");
const assert = require("assert");
class UpdateOrderbook {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    updateOrderbook(orderbook) {
        assert(orderbook.time === this.context.timeline.now());
        this.models.book.setBasebook(orderbook);
        this.broadcast.emit('orderbook', this.models.book.getBook());
    }
}
exports.UpdateOrderbook = UpdateOrderbook;
class DatabaseOrderbookStatic {
    constructor(H) {
        this.H = H;
        this.Orderbook = new interfaces_1.OrderbookStatic(this.H);
    }
    copy(orderbook) {
        return {
            ...this.Orderbook.copy(orderbook),
            id: orderbook.id,
        };
    }
}
exports.DatabaseOrderbookStatic = DatabaseOrderbookStatic;
//# sourceMappingURL=update-orderbook.js.map
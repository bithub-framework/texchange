"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderbook = void 0;
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
        this.models.progress.updateDatabaseOrderbook(orderbook);
        this.broadcast.emit('orderbook', this.models.book.getBook());
    }
}
exports.UpdateOrderbook = UpdateOrderbook;
//# sourceMappingURL=update-orderbook.js.map
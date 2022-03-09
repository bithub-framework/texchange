"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderbook = void 0;
const use_case_1 = require("../use-case");
const assert = require("assert");
class UpdateOrderbook extends use_case_1.UseCase {
    constructor(context, models, broadcast, tasks) {
        super();
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
//# sourceMappingURL=update-orderbook.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderbook = void 0;
const initialize_stages_1 = require("../initialize-stages");
const assert = require("assert");
class UpdateOrderbook {
    constructor(context, models, controllers) {
        this.context = context;
        this.models = models;
        this.controllers = controllers;
        this.involved = [this.models.book];
    }
    updateOrderbook(orderbook) {
        (0, initialize_stages_1.initializeStages)(this.involved);
        assert(orderbook.time === this.context.timeline.now());
        this.models.book.setBasebook(orderbook);
        this.context.broadcast.emit('orderbook', this.models.book.getBook());
        this.models.book.stage = true;
    }
}
exports.UpdateOrderbook = UpdateOrderbook;
//# sourceMappingURL=update-orderbook.js.map
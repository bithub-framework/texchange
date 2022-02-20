"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderbook = void 0;
const initialize_stages_1 = require("./initialize-stages");
const events_1 = require("events");
const assert = require("assert");
class UpdateOrderbook extends events_1.EventEmitter {
    constructor(context, models, controllers) {
        super();
        this.context = context;
        this.models = models;
        this.controllers = controllers;
        this.involved = [this.models.book];
    }
    updateOrderbook(orderbook) {
        (0, initialize_stages_1.initializeStages)(this.involved);
        assert(orderbook.time === this.context.timeline.now());
        this.models.book.setBasebook(orderbook);
        this.emit('pushOrderbook');
        this.models.book.stage = true;
    }
}
exports.UpdateOrderbook = UpdateOrderbook;
//# sourceMappingURL=update-orderbook.js.map
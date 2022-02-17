"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updating = void 0;
const events_1 = require("events");
const assert = require("assert");
class Updating extends events_1.EventEmitter {
    constructor(context, models, stages, taken) {
        super();
        this.context = context;
        this.models = models;
        this.stages = stages;
        this.taken = taken;
    }
    updateTrades(trades) {
        assert(trades.length);
        const now = this.context.timeline.now();
        assert(now !== this.models.progress.latestDatabaseTradeTime);
        for (const trade of trades)
            assert(trade.time === now);
        this.models.progress.updateDatabaseTrades(trades);
        for (const trade of trades)
            this.taken.tradeTakesOpenMakers(trade);
        this.emit('pushTrades', trades);
        this.models.pricing.updateTrades(trades);
        this.stages.progress = true;
        this.stages.pricing = true;
    }
    updateOrderbook(orderbook) {
        assert(orderbook.time === this.context.timeline.now());
        this.models.book.setBasebook(orderbook);
        this.emit('pushOrderbook');
        this.stages.book = true;
    }
}
exports.Updating = Updating;
Updating.involved = ['book', 'progress', 'pricing'];
//# sourceMappingURL=updating.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTrades = void 0;
const assert = require("assert");
const initialize_stages_1 = require("./initialize-stages");
const events_1 = require("events");
class UpdateTrades extends events_1.EventEmitter {
    constructor(context, models, controllers) {
        super();
        this.context = context;
        this.models = models;
        this.controllers = controllers;
        this.involved = [
            this.models.progress,
            this.models.pricing,
            ...this.controllers.taken.involved,
        ];
    }
    updateTrades(trades) {
        (0, initialize_stages_1.initializeStages)(this.involved);
        const { taken } = this.controllers;
        assert(trades.length);
        const now = this.context.timeline.now();
        assert(now !== this.models.progress.latestDatabaseTradeTime);
        for (const trade of trades)
            assert(trade.time === now);
        this.models.progress.updateDatabaseTrades(trades);
        for (const trade of trades)
            taken.tradeTakesOpenMakers(trade);
        this.emit('pushTrades', trades);
        this.models.pricing.updateTrades(trades);
        this.models.progress.stage = true;
        this.models.pricing.stage = true;
    }
}
exports.UpdateTrades = UpdateTrades;
//# sourceMappingURL=update-trades.js.map
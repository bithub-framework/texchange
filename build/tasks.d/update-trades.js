"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTrades = void 0;
const assert = require("assert");
const initialize_stages_1 = require("../initialize-stages");
class UpdateTrades {
    constructor(context, models, controllers) {
        this.context = context;
        this.models = models;
        this.controllers = controllers;
        this.involved = [
            this.models.progress,
            this.models.pricing,
            ...this.controllers.tradeTakesOpenMakers.involved,
        ];
    }
    updateTrades(trades) {
        (0, initialize_stages_1.initializeStages)(this.involved);
        const { tradeTakesOpenMakers: taken } = this.controllers;
        assert(trades.length);
        const now = this.context.timeline.now();
        assert(now !== this.models.progress.latestDatabaseTradeTime);
        for (const trade of trades)
            assert(trade.time === now);
        this.models.progress.updateDatabaseTrades(trades);
        this.context.broadcast.emit('trades', trades);
        for (const trade of trades)
            taken.tradeTakesOpenMakers(trade);
        this.models.pricing.updateTrades(trades);
        this.models.progress.stage = true;
        this.models.pricing.stage = true;
    }
}
exports.UpdateTrades = UpdateTrades;
//# sourceMappingURL=update-trades.js.map
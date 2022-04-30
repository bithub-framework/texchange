"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTrades = void 0;
const assert = require("assert");
class UpdateTrades {
    constructor(context, models, broadcast, tasks, realTimeSettlement) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
        this.realTimeSettlement = realTimeSettlement;
    }
    updateTrades(trades) {
        const { tradeTakesOpenMakers, settle } = this.tasks;
        assert(trades.length);
        const now = this.context.timeline.now();
        for (const trade of trades)
            assert(trade.time === now);
        this.broadcast.emit('trades', trades);
        for (const trade of trades)
            tradeTakesOpenMakers.tradeTakesOpenMakers(trade);
        this.models.pricing.updateTrades(trades);
        if (this.realTimeSettlement)
            settle.settle();
    }
}
exports.UpdateTrades = UpdateTrades;
//# sourceMappingURL=update-trades.js.map
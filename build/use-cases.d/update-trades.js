"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseTradeStatic = exports.UpdateTrades = void 0;
const assert = require("assert");
const interfaces_1 = require("interfaces");
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
class DatabaseTradeStatic {
    constructor(H) {
        this.H = H;
        this.Trade = new interfaces_1.TradeStatic(this.H);
    }
    copy(trade) {
        return {
            ...this.Trade.copy(trade),
            id: trade.id,
        };
    }
}
exports.DatabaseTradeStatic = DatabaseTradeStatic;
//# sourceMappingURL=update-trades.js.map
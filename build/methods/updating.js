"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsUpdating = void 0;
const assert = require("assert");
class MethodsUpdating {
    constructor(core) {
        this.core = core;
    }
    updateTrades(trades) {
        assert(trades.length);
        for (const trade of trades) {
            assert(trade.time === this.core.timeline.now());
            this.core.states.misc.updateDatabaseTrade(trade);
        }
        this.core.interfaces.instant.pushTrades(trades);
        for (const trade of trades)
            this.core.taken.tradeTakesOpenMakers(trade);
        this.core.states.mtm.updateTrades(trades);
    }
    updateOrderbook(orderbook) {
        assert(orderbook.time === this.core.timeline.now());
        this.core.states.orderbook.setBase(orderbook);
        this.core.interfaces.instant.pushOrderbook();
    }
}
exports.MethodsUpdating = MethodsUpdating;
//# sourceMappingURL=updating.js.map
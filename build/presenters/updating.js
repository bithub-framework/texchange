"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updating = void 0;
const assert = require("assert");
class Updating {
    constructor(hub) {
        this.hub = hub;
    }
    /**
     * Make sure update all trades which have same timestamp at a time.
     * @param trades
     */
    updateTrades(trades) {
        assert(trades.length);
        for (const trade of trades) {
            assert(trade.time === this.hub.context.timeline.now());
            this.hub.models.progress.updateDatabaseTrade(trade);
            this.hub.presenters.taken.tradeTakesOpenMakers(trade);
        }
        this.hub.views.instant.pushTrades(trades);
        this.hub.models.mtm.updateTrades(trades);
    }
    updateOrderbook(orderbook) {
        assert(orderbook.time === this.hub.context.timeline.now());
        this.hub.models.orderbooks.setBasebook(orderbook);
        this.hub.views.instant.pushOrderbook();
    }
}
exports.Updating = Updating;
//# sourceMappingURL=updating.js.map
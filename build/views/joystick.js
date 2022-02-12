"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joystick = void 0;
const assert = require("assert");
class Joystick {
    constructor(hub) {
        this.hub = hub;
    }
    /**
     * Make sure update all trades which have same timestamp at a time.
     * @param trades
     */
    updateTrades(trades) {
        assert(trades.length);
        const now = this.hub.context.timeline.now();
        assert(now !== this.hub.models.progress.latestDatabaseTradeTime);
        for (const trade of trades)
            assert(trade.time === now);
        this.hub.models.progress.updateDatabaseTrades(trades);
        for (const trade of trades)
            this.hub.presenters.taken.tradeTakesOpenMakers(trade);
        this.hub.views.instant.pushTrades(trades);
        this.hub.models.mtm.updateTrades(trades);
    }
    updateOrderbook(orderbook) {
        assert(orderbook.time === this.hub.context.timeline.now());
        this.hub.models.orderbooks.setBasebook(orderbook);
        this.hub.views.instant.pushOrderbook();
    }
}
exports.Joystick = Joystick;
//# sourceMappingURL=joystick.js.map
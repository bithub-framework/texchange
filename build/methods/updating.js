"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsUpdating = void 0;
const assert = require("assert");
class MethodsUpdating {
    constructor(core) {
        this.core = core;
    }
    updateTrades(trades) {
        for (const trade of trades) {
            assert(trade.time === this.core.timeline.now());
            this.core.states.misc.updateDatabaseTrade(trade);
        }
        for (const trade of trades)
            this.core.states.mtm.updateTrade(trade);
        this.core.interfaces.instant.pushTrades(trades);
        // let totalVolume = new Big(0);
        for (let uTrade of trades) {
            const volume = this.core.taken.tradeTakesOpenMakers(uTrade);
            // totalVolume = totalVolume.plus(volume);
        }
        // for (let uTrade of uTrades) {
        //     this.markPrice = new Big(0)
        //         .plus(this.markPrice.times(.9))
        //         .plus(uTrade.price.times(.1))
        //         .round(this.config.PRICE_DP);
        //     this.latestPrice = uTrade.price;
        // }
    }
    updateOrderbook(orderbook) {
        assert(orderbook.time === this.core.timeline.now());
        this.core.states.orderbook.setBase(orderbook);
        this.core.states.orderbook.apply();
        this.core.interfaces.instant.pushOrderbook();
    }
}
exports.MethodsUpdating = MethodsUpdating;
//# sourceMappingURL=updating.js.map
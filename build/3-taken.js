"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const _2_ordering_1 = require("./2-ordering");
const interfaces_1 = require("./interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
class Texchange extends _2_ordering_1.Texchange {
    uTradeShouldTakeOpenOrder(trade, maker) {
        return (maker.side === interfaces_1.Side.BID &&
            trade.side === interfaces_1.Side.ASK &&
            trade.price.lte(maker.price)
            ||
                maker.side === interfaces_1.Side.ASK &&
                    trade.side === interfaces_1.Side.BID &&
                    trade.price.gte(maker.price));
    }
    uTradeTakesOrderQueue(uTrade, maker) {
        if (uTrade.price.eq(maker.price)) {
            const volume = interfaces_1.min(uTrade.quantity, maker.behind);
            uTrade.quantity = uTrade.quantity.minus(volume);
            maker.behind = maker.behind.minus(volume);
        }
        else
            maker.behind = new big_js_1.default(0);
    }
    uTradeTakesOpenMaker(uTrade, maker) {
        const volume = interfaces_1.min(uTrade.quantity, maker.unfilled);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        this.makers.takeOrder(maker.id, volume, dollarVolume);
        return volume;
    }
    uTradeTakesOpenMakers(uTrade) {
        uTrade = {
            price: uTrade.price,
            quantity: uTrade.quantity,
            side: uTrade.side,
            time: uTrade.time,
        };
        let totalVolume = new big_js_1.default(0);
        for (const order of [...this.makers.values()])
            if (this.uTradeShouldTakeOpenOrder(uTrade, order)) {
                this.uTradeTakesOrderQueue(uTrade, order);
                const volume = this.uTradeTakesOpenMaker(uTrade, order);
                totalVolume = totalVolume.plus(volume);
            }
        return totalVolume;
    }
    /** @override */
    updateTrades(uTrades) {
        for (const uTrade of uTrades)
            assert(uTrade.time === this.now());
        this.pushUTrades(uTrades);
        for (let uTrade of uTrades) {
            this.settlementPrice = new big_js_1.default(0)
                .plus(this.settlementPrice.times(.9))
                .plus(uTrade.price.times(.1))
                .round(this.config.PRICE_DP);
            this.latestPrice = uTrade.price;
        }
        let totalVolume = new big_js_1.default(0);
        for (let uTrade of uTrades) {
            const volume = this.uTradeTakesOpenMakers(uTrade);
            totalVolume = totalVolume.plus(volume);
        }
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=3-taken.js.map
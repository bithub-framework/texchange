"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = void 0;
const _4_equity_1_making_1 = require("./4-equity.1-making");
const min_1 = require("./min");
const interfaces_1 = require("./interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
class Core extends _4_equity_1_making_1.Core {
    /** @override */
    uTradeTakesOpenMaker(uTrade, maker) {
        const volume = min_1.min(uTrade.quantity, maker.unfilled);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        this.makers.takeOrder(maker.id, volume, dollarVolume);
        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
        if (maker.operation === interfaces_1.Operation.OPEN) {
            this.equity.openPosition(maker.length, volume, dollarVolume, makerFee);
        }
        else {
            this.equity.closePosition(maker.length, volume, dollarVolume, makerFee);
        }
        return volume;
    }
    /** @override */
    updateTrades(uTrades) {
        for (const uTrade of uTrades)
            assert(uTrade.time === this.now());
        this.pushUTrades(uTrades);
        for (let uTrade of uTrades) {
            this.markPrice = new big_js_1.default(0)
                .plus(this.markPrice.times(.9))
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
exports.Core = Core;
//# sourceMappingURL=4-equity.2-taken.js.map
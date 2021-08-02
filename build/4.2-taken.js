"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const _4_1_making_1 = require("./4.1-making");
const min_1 = require("./min");
const interfaces_1 = require("./interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
class Texchange extends _4_1_making_1.Texchange {
    uTradeTakesOpenMaker(uTrade, maker) {
        const volume = min_1.min(uTrade.quantity, maker.unfilled);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        const toThaw = this.makers.takeOrder(maker.id, volume, dollarVolume);
        this.assets.thaw(toThaw);
        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
        if (maker.operation === interfaces_1.Operation.OPEN) {
            this.assets.incMargin(this.config.calcMarginIncrement({
                spec: this.config,
                orderPrice: maker.price,
                volume,
                dollarVolume,
                settlementPrice: this.settlementPrice,
                latestPrice: this.latestPrice,
            }).round(this.config.CURRENCY_DP));
            this.assets.openPosition(maker.length, volume, dollarVolume, makerFee);
        }
        else {
            this.assets.decMargin(this.config.calcMarginDecrement({
                spec: this.config,
                position: this.assets.position,
                cost: this.assets.cost,
                volume,
                marginSum: this.assets.marginSum,
            }).round(this.config.CURRENCY_DP));
            this.assets.closePosition(maker.length, volume, dollarVolume, makerFee);
        }
        return volume;
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
//# sourceMappingURL=4.2-taken.js.map
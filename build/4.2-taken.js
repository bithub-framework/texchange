"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const _4_1_making_1 = require("./4.1-making");
const interfaces_1 = require("./interfaces");
const big_js_1 = require("big.js");
class Texchange extends _4_1_making_1.Texchange {
    uTradeTakesOpenMaker(uTrade, maker) {
        const volume = interfaces_1.min(uTrade.quantity, maker.unfilled);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        const toThaw = this.makers.takeOrder(maker.id, volume, dollarVolume);
        this.assets.thaw(toThaw);
        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
        if (maker.operation === interfaces_1.Operation.OPEN) {
            this.assets.openPosition(maker.length, volume, dollarVolume, makerFee);
            this.assets.incMargin(maker.price, volume);
        }
        else {
            this.assets.closePosition(maker.length, volume, dollarVolume, makerFee);
            this.assets.decMargin(volume);
        }
        return volume;
    }
    /** @override */
    updateTrades(uTrades) {
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
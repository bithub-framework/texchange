"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const _5_margin_1_making_1 = require("./5-margin.1-making");
const min_1 = require("./min");
const interfaces_1 = require("./interfaces");
class Texchange extends _5_margin_1_making_1.Texchange {
    /** @override */
    uTradeTakesOpenMaker(uTrade, maker) {
        const volume = min_1.min(uTrade.quantity, maker.unfilled);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        const toThaw = this.makers.takeOrder(maker.id, volume, dollarVolume);
        this.margin.thaw(toThaw);
        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
        if (maker.operation === interfaces_1.Operation.OPEN) {
            this.margin.incMargin(this.config.calcPositionMarginIncrement({
                spec: this.config,
                orderPrice: maker.price,
                volume,
                dollarVolume,
                clearingPrice: this.clearingPrice,
                latestPrice: this.latestPrice,
            }).round(this.config.CURRENCY_DP));
            this.equity.openPosition(maker.length, volume, dollarVolume, makerFee);
        }
        else {
            this.margin.decMargin(this.config.calcPositionMarginDecrement({
                spec: this.config,
                position: this.equity.position,
                cost: this.equity.cost,
                volume,
                marginSum: this.margin.marginSum,
            }).round(this.config.CURRENCY_DP));
            this.equity.closePosition(maker.length, volume, dollarVolume, makerFee);
        }
        return volume;
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=5-margin.2-taken.js.map
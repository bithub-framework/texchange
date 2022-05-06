"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settle = void 0;
const secretary_like_1 = require("secretary-like");
class Settle {
    constructor(context, models, broadcast) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    settle() {
        const { config, calc } = this.context;
        const { assets, margins, pricing } = this.models;
        const position = assets.getPosition();
        const settlementPrice = pricing.getSettlementPrice();
        for (const length of [secretary_like_1.Length.LONG, secretary_like_1.Length.SHORT]) {
            const dollarVolume = calc.dollarVolume(settlementPrice, position[length]).round(config.market.CURRENCY_DP);
            const profit = assets.close(length, position[length], dollarVolume);
            assets.open(length, position[length], dollarVolume);
            margins.setMargin(length, this.clearingMargin(length, profit));
        }
        this.assertEnoughBalance();
    }
}
exports.Settle = Settle;
//# sourceMappingURL=settle.js.map
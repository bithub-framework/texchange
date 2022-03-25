"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settle = void 0;
const interfaces_1 = require("interfaces");
class Settle {
    constructor(context, models, broadcast, tasks) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    settle() {
        const { config, calc } = this.context;
        const { assets, margins, pricing } = this.models;
        const position = assets.getPosition();
        const settlementPrice = pricing.getSettlementPrice();
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
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
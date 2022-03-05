"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settle = void 0;
const interfaces_1 = require("interfaces");
const task_1 = require("../task");
class Settle extends task_1.Task {
    settle() {
        const { config } = this.context;
        const { assets, margin, pricing } = this.models;
        const position = {
            [interfaces_1.Length.LONG]: assets.position[interfaces_1.Length.LONG],
            [interfaces_1.Length.SHORT]: assets.position[interfaces_1.Length.SHORT],
        };
        const settlementPrice = pricing.getSettlementPrice();
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            const dollarVolume = config.dollarVolume(settlementPrice, position[length]).round(config.CURRENCY_DP);
            const profit = assets.closePosition(length, position[length], dollarVolume);
            assets.openPosition(length, position[length], dollarVolume);
            margin[length] = this.clearingMargin(length, profit);
        }
        this.assertEnoughBalance();
    }
}
exports.Settle = Settle;
//# sourceMappingURL=settle.js.map
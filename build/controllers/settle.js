"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settle = void 0;
const interfaces_1 = require("../interfaces");
const assert = require("assert");
class Settle {
    constructor(context, models) {
        this.context = context;
        this.models = models;
        this.involved = [
            this.models.assets,
            this.models.pricing,
            this.models.margin,
        ];
    }
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
    clearingMargin(length, profit) {
        // 默认逐仓
        return this.models.margin[length]
            .plus(profit);
    }
    assertEnoughBalance() {
        // 默认逐仓
        for (const length of [interfaces_1.Length.SHORT, interfaces_1.Length.LONG])
            assert(this.models.margin[length].gte(0));
    }
}
exports.Settle = Settle;
//# sourceMappingURL=settle.js.map
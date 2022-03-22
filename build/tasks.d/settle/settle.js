"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settle = void 0;
const interfaces_1 = require("interfaces");
class Settle {
    settle() {
        const { config } = this.context;
        const { assets, margins, pricing } = this.models;
        const position = {
            [interfaces_1.Length.LONG]: assets.getPosition()[interfaces_1.Length.LONG],
            [interfaces_1.Length.SHORT]: assets.getPosition()[interfaces_1.Length.SHORT],
        };
        const settlementPrice = pricing.getSettlementPrice();
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            const dollarVolume = config.market.dollarVolume(settlementPrice, position[length]).round(config.market.CURRENCY_DP);
            const profit = assets.close({
                length,
                volume: position[length],
                dollarVolume,
            });
            assets.open({
                length,
                volume: position[length],
                dollarVolume,
            });
            margins.setMargin(length, this.clearingMargin(length, profit));
        }
        this.assertEnoughBalance();
    }
}
exports.Settle = Settle;
//# sourceMappingURL=settle.js.map
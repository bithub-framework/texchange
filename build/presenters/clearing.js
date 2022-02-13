"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clearing = void 0;
const interfaces_1 = require("../interfaces");
class Clearing {
    constructor(hub) {
        this.hub = hub;
    }
    settle() {
        const { calculation } = this.hub.context;
        const { assets, mtm, margin } = this.hub.models;
        const position = {
            [interfaces_1.Length.LONG]: assets.position[interfaces_1.Length.LONG],
            [interfaces_1.Length.SHORT]: assets.position[interfaces_1.Length.SHORT],
        };
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            const dollarVolume = calculation.dollarVolume(mtm.getSettlementPrice(), position[length]).round(this.hub.context.config.CURRENCY_DP);
            const profit = assets.closePosition(length, position[length], dollarVolume);
            assets.openPosition(length, position[length], dollarVolume);
            margin[length] = calculation.ClearingMargin(length, profit);
        }
        calculation.assertEnoughBalance();
    }
}
exports.Clearing = Clearing;
//# sourceMappingURL=clearing.js.map
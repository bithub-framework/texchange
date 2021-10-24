"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsClearing = void 0;
const interfaces_1 = require("../interfaces");
class MethodsClearing {
    constructor(core) {
        this.core = core;
    }
    settle() {
        const { calculation } = this.core;
        const { assets, mtm, margin } = this.core.states;
        const position = {
            [interfaces_1.Length.LONG]: assets.position[interfaces_1.Length.LONG],
            [interfaces_1.Length.SHORT]: assets.position[interfaces_1.Length.SHORT],
        };
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            const dollarVolume = calculation.dollarVolume(mtm.getSettlementPrice(), position[length]).round(this.core.config.CURRENCY_DP);
            const profit = assets.closePosition(length, position[length], dollarVolume);
            assets.openPosition(length, position[length], dollarVolume);
            margin[length] = calculation.marginOnSettlement(length, profit);
        }
        if (calculation.shouldLiquidate().length)
            this.core.stop(new Error('Liquidated.'));
    }
}
exports.MethodsClearing = MethodsClearing;
//# sourceMappingURL=clearing.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsClearing = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
class MethodsClearing {
    constructor(core) {
        this.core = core;
    }
    settle() {
        const position = interfaces_1.clone(this.core.states.assets.position);
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            const clearingDollarVolume = this.core.calculation.dollarVolume(this.core.states.mtm.getSettlementPrice(), position[length]).round(this.core.config.CURRENCY_DP);
            const profit = this.core.states.assets.closePosition(length, position[length], clearingDollarVolume, new big_js_1.default(0));
            this.core.states.assets.openPosition(length, position[length], clearingDollarVolume, new big_js_1.default(0));
            this.core.states.margin[length] =
                this.core.calculation.marginOnSettlement(length, profit);
        }
        if (this.core.calculation.shouldLiquidate().length)
            this.core.stop(new Error('Liquidated.'));
    }
}
exports.MethodsClearing = MethodsClearing;
//# sourceMappingURL=clearing.js.map
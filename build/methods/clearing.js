"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodsClearing = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
class MethodsClearing {
    constructor(core) {
        this.core = core;
    }
    clear() {
        const position = interfaces_1.clone(this.core.states.assets.position);
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT]) {
            const clearingDollarVolume = this.core.calculation.dollarVolume(this.core.states.mtm.getMarkPrice(), position[length]).round(this.core.config.CURRENCY_DP);
            this.core.states.assets.closePosition(length, position[length], clearingDollarVolume, new big_js_1.default(0));
            this.core.states.assets.openPosition(length, position[length], clearingDollarVolume, new big_js_1.default(0));
        }
        for (const length of [interfaces_1.Length.LONG, interfaces_1.Length.SHORT])
            this.core.states.margin.setPositionMargin(length, this.core.calculation.positionMarginOnClearing());
    }
}
exports.MethodsClearing = MethodsClearing;
//# sourceMappingURL=clearing.js.map
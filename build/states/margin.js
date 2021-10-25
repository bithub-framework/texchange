"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMargin = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
class StateMargin {
    constructor(core) {
        this.core = core;
        this[interfaces_1.Length.LONG] = new big_js_1.default(0);
        this[interfaces_1.Length.SHORT] = new big_js_1.default(0);
    }
    get frozen() {
        return this.core.states.makers.totalFrozen;
    }
    get available() {
        return this.core.states.assets.balance
            .minus(this.core.calculation.totalMargin())
            .minus(this.core.calculation.totalFrozenBalance());
    }
    get closable() {
        const { assets } = this.core.states;
        return {
            [interfaces_1.Length.LONG]: assets.position[interfaces_1.Length.LONG]
                .minus(this.frozen.position[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: assets.position[interfaces_1.Length.SHORT]
                .minus(this.frozen.position[interfaces_1.Length.SHORT]),
        };
    }
    incMargin(length, volume, dollarVolume) {
        this[length] = this[length]
            .plus(this.core.calculation.marginIncrement(length, volume, dollarVolume)).round(this.core.config.CURRENCY_DP);
    }
    decMargin(length, volume, dollarVolume) {
        const { assets } = this.core.states;
        if (volume.lte(assets.position[length])) {
            this[length] = this[length]
                .times(assets.position[length].minus(volume))
                .div(assets.position[length])
                .round(this.core.config.CURRENCY_DP);
        }
        else {
            const restVolume = volume.minus(assets.position[length]);
            const restDollarVolume = dollarVolume
                .times(restVolume)
                .div(volume)
                .round(this.core.config.CURRENCY_DP);
            this[length] = new big_js_1.default(0);
            this.incMargin(-length, restVolume, restDollarVolume);
        }
    }
    capture() {
        return {
            [interfaces_1.Length.LONG]: this[interfaces_1.Length.LONG],
            [interfaces_1.Length.SHORT]: this[interfaces_1.Length.SHORT],
        };
    }
    restore(snapshot) {
        this[interfaces_1.Length.LONG] = new big_js_1.default(snapshot[interfaces_1.Length.LONG]);
        this[interfaces_1.Length.SHORT] = new big_js_1.default(snapshot[interfaces_1.Length.SHORT]);
    }
}
exports.StateMargin = StateMargin;
//# sourceMappingURL=margin.js.map
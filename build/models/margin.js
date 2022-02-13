"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Margin = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
class Margin {
    constructor(hub) {
        this.hub = hub;
        this[interfaces_1.Length.LONG] = new big_js_1.default(0);
        this[interfaces_1.Length.SHORT] = new big_js_1.default(0);
    }
    incMargin(length, volume, dollarVolume) {
        this[length] = this[length]
            .plus(this.hub.context.calculation.marginIncrement(length, volume, dollarVolume)).round(this.hub.context.config.CURRENCY_DP);
    }
    // TODO try
    decMargin(length, volume, dollarVolume) {
        const { assets } = this.hub.models;
        const { calculation } = this.hub.context;
        if (volume.lte(assets.position[length])) {
            this[length] = this[length]
                .minus(calculation.marginDecrement(length, volume, dollarVolume))
                .round(this.hub.context.config.CURRENCY_DP);
        }
        else {
            const restVolume = volume.minus(assets.position[length]);
            const restDollarVolume = dollarVolume
                .times(restVolume)
                .div(volume)
                .round(this.hub.context.config.CURRENCY_DP);
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
exports.Margin = Margin;
//# sourceMappingURL=margin.js.map
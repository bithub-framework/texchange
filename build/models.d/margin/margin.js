"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Margin = void 0;
const interfaces_1 = require("interfaces");
const model_1 = require("../../model");
const big_js_1 = require("big.js");
// import { inspect } from 'util';
class Margin extends model_1.Model {
    constructor() {
        super();
        this[interfaces_1.Length.LONG] = new big_js_1.default(0);
        this[interfaces_1.Length.SHORT] = new big_js_1.default(0);
    }
    incMargin(length, volume, dollarVolume) {
        this[length] = this[length]
            .plus(this.marginIncrement(length, volume, dollarVolume)).round(this.context.config.market.CURRENCY_DP);
    }
    // TODO try
    decMargin(oldAssets, length, volume, dollarVolume) {
        if (volume.lte(oldAssets.position[length])) {
            this[length] = this[length]
                .minus(this.marginDecrement(oldAssets, length, volume, dollarVolume))
                .round(this.context.config.market.CURRENCY_DP);
        }
        else {
            const restVolume = volume.minus(oldAssets.position[length]);
            const restDollarVolume = dollarVolume
                .times(restVolume)
                .div(volume)
                .round(this.context.config.market.CURRENCY_DP);
            this[length] = new big_js_1.default(0);
            this.incMargin(-length, restVolume, restDollarVolume);
        }
    }
    capture() {
        return {
            [interfaces_1.Length.LONG]: this[interfaces_1.Length.LONG].toString(),
            [interfaces_1.Length.SHORT]: this[interfaces_1.Length.SHORT].toString(),
        };
    }
    restore(snapshot) {
        this[interfaces_1.Length.LONG] = new big_js_1.default(snapshot[interfaces_1.Length.LONG]);
        this[interfaces_1.Length.SHORT] = new big_js_1.default(snapshot[interfaces_1.Length.SHORT]);
    }
}
exports.Margin = Margin;
//# sourceMappingURL=margin.js.map
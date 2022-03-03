"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Margin = void 0;
const interfaces_1 = require("../interfaces");
const model_1 = require("./model");
const big_js_1 = require("big.js");
class Margin extends model_1.Model {
    constructor(context) {
        super(context);
        this.context = context;
        this[interfaces_1.Length.LONG] = new big_js_1.default(0);
        this[interfaces_1.Length.SHORT] = new big_js_1.default(0);
    }
    incMargin(length, volume, dollarVolume) {
        this[length] = this[length]
            .plus(this.marginIncrement(length, volume, dollarVolume)).round(this.context.config.CURRENCY_DP);
    }
    // TODO try
    decMargin(oldAssets, length, volume, dollarVolume) {
        if (volume.lte(oldAssets.position[length])) {
            this[length] = this[length]
                .minus(this.marginDecrement(oldAssets, length, volume, dollarVolume))
                .round(this.context.config.CURRENCY_DP);
        }
        else {
            const restVolume = volume.minus(oldAssets.position[length]);
            const restDollarVolume = dollarVolume
                .times(restVolume)
                .div(volume)
                .round(this.context.config.CURRENCY_DP);
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
    // public [inspect.custom]() {
    //     return JSON.stringify({
    //         [Length.LONG]: this[Length.LONG],
    //         [Length.SHORT]: this[Length.SHORT],
    //         frozen: {
    //             position: {
    //                 [Length.LONG]: this.frozen.position[Length.LONG],
    //                 [Length.SHORT]: this.frozen.position[Length.SHORT],
    //             },
    //             balance: {
    //                 [Length.LONG]: this.frozen.balance[Length.LONG],
    //                 [Length.SHORT]: this.frozen.balance[Length.SHORT],
    //             },
    //         },
    //         available: this.available,
    //         closable: this.closable,
    //     });
    // }
    /**
     * this.hub.assets.position[order.length] has not been updated.
     */
    marginIncrement(length, volume, dollarVolume) {
        // 默认非实时结算
        return dollarVolume.div(this.context.config.LEVERAGE);
    }
    /**
     * this.hub.assets.position[order.length] has not been updated.
     */
    marginDecrement(oldAssets, length, volume, dollarVolume) {
        return this[length]
            .times(volume)
            .div(oldAssets.position[length]);
    }
}
exports.Margin = Margin;
//# sourceMappingURL=margin.js.map
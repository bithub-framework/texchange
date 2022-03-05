"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMargin = void 0;
const margin_1 = require("./margin");
/**
 * 默认非实时结算
 */
class DefaultMargin extends margin_1.Margin {
    constructor(context) {
        super();
        this.context = context;
    }
    marginIncrement(length, volume, dollarVolume) {
        return dollarVolume.div(this.context.config.LEVERAGE);
    }
    marginDecrement(oldAssets, length, volume, dollarVolume) {
        return this[length]
            .times(volume)
            .div(oldAssets.position[length]);
    }
}
exports.DefaultMargin = DefaultMargin;
//# sourceMappingURL=default.js.map
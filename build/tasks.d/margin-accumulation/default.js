"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMarginAccumulation = void 0;
const big_js_1 = require("big.js");
const margin_accumulation_1 = require("./margin-accumulation");
class DefaultMarginAccumulation extends margin_accumulation_1.MarginAccumulation {
    constructor(context, models, broadcast, tasks) {
        super();
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    newMarginAfterOpening({ length, volume, dollarVolume, }) {
        const increment = dollarVolume.div(this.context.config.account.LEVERAGE);
        return this.models.margins.getMargin()[length].plus(increment);
    }
    newMarginAfterClosing({ length, volume, dollarVolume, }) {
        if (volume.eq(this.models.assets.getPosition()[length]))
            return new big_js_1.default(0);
        const margin = this.models.margins.getMargin()[length];
        const decrement = margin
            .times(volume)
            .div(this.models.assets.getPosition()[length]);
        return margin.minus(decrement);
    }
}
exports.DefaultMarginAccumulation = DefaultMarginAccumulation;
//# sourceMappingURL=default.js.map
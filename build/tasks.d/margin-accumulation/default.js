"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMarginAccumulation = void 0;
const injektor_1 = require("injektor");
const margin_accumulation_1 = require("./margin-accumulation");
class DefaultMarginAccumulation extends margin_accumulation_1.MarginAccumulation {
    constructor(context, models, broadcast) {
        super(context, models, broadcast);
        this.models = models;
    }
    newMarginAfterOpening({ length, volume, dollarVolume, }) {
        const increment = dollarVolume.div(this.context.config.account.LEVERAGE);
        return this.models.margins.getMargin()[length].plus(increment);
    }
    newMarginAfterClosing({ length, volume, dollarVolume, }) {
        if (volume.eq(this.models.assets.getPosition()[length]))
            return this.context.H.from(0);
        const margin = this.models.margins.getMargin()[length];
        const decrement = margin
            .times(volume)
            .div(this.models.assets.getPosition()[length]);
        return margin.minus(decrement);
    }
}
DefaultMarginAccumulation.TaskDeps = {};
__decorate([
    (0, injektor_1.inject)(DefaultMarginAccumulation.TaskDeps)
], DefaultMarginAccumulation.prototype, "tasks", void 0);
exports.DefaultMarginAccumulation = DefaultMarginAccumulation;
//# sourceMappingURL=default.js.map
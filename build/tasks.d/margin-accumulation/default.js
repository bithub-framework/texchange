"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMarginAccumulation = void 0;
const margin_accumulation_1 = require("./margin-accumulation");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/default/types");
let DefaultMarginAccumulation = class DefaultMarginAccumulation extends margin_accumulation_1.MarginAccumulation {
    constructor(context, models, broadcast) {
        super();
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    newMarginAfterOpening({ length, volume, dollarVolume, }) {
        const increment = dollarVolume.div(this.context.spec.account.LEVERAGE);
        return this.models.margins.getMargin()[length].plus(increment);
    }
    newMarginAfterClosing({ length, volume, dollarVolume, }) {
        if (volume.eq(this.models.assets.getPosition()[length]))
            return new this.context.Data.H(0);
        const margin = this.models.margins.getMargin()[length];
        const decrement = margin
            .times(volume)
            .div(this.models.assets.getPosition()[length]);
        return margin.minus(decrement);
    }
};
DefaultMarginAccumulation = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.Context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.Models)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.Broadcast))
], DefaultMarginAccumulation);
exports.DefaultMarginAccumulation = DefaultMarginAccumulation;
//# sourceMappingURL=default.js.map
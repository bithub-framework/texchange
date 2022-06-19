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
exports.TaskOrderVolumes = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let TaskOrderVolumes = class TaskOrderVolumes {
    constructor(marketSpec, models) {
        this.marketSpec = marketSpec;
        this.models = models;
    }
    open({ length, volume, dollarVolume, }) {
        const newMargin = this.tasks.marginAccumulation.newMarginAfterOpening({
            length,
            volume,
            dollarVolume,
        }).round(this.marketSpec.CURRENCY_DP);
        this.models.assets.open(length, volume, dollarVolume);
        this.models.margins.setMargin(length, newMargin);
    }
    close({ length, volume, dollarVolume, }) {
        const position = this.models.assets.getPosition()[length];
        if (volume.gt(position)) {
            const openVolume = volume.minus(position);
            const openDollarVolume = dollarVolume
                .times(openVolume)
                .div(volume)
                .round(this.marketSpec.CURRENCY_DP);
            const closeDollarVolume = dollarVolume
                .minus(openDollarVolume);
            this.close({
                length,
                volume: position,
                dollarVolume: closeDollarVolume
            });
            this.open({
                length: -length,
                volume: openDollarVolume,
                dollarVolume: openDollarVolume,
            });
        }
        else {
            const newMargin = this.tasks.marginAccumulation.newMarginAfterClosing({
                length,
                volume,
                dollarVolume,
            }).round(this.marketSpec.CURRENCY_DP);
            this.models.assets.close(length, volume, dollarVolume);
            this.models.margins.setMargin(length, newMargin);
        }
    }
};
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.tasks)
], TaskOrderVolumes.prototype, "tasks", void 0);
TaskOrderVolumes = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.models))
], TaskOrderVolumes);
exports.TaskOrderVolumes = TaskOrderVolumes;
//# sourceMappingURL=order-volumes.js.map
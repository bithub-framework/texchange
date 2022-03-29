"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderVolumes = void 0;
const injektor_1 = require("injektor");
class OrderVolumes {
    constructor(context, models, broadcast) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    open({ length, volume, dollarVolume, }) {
        const newMargin = this.tasks.marginAccumulation.newMarginAfterOpening({
            length,
            volume,
            dollarVolume,
        }).round(this.context.config.market.CURRENCY_DP);
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
                .round(this.context.config.market.CURRENCY_DP);
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
            }).round(this.context.config.market.CURRENCY_DP);
            this.models.assets.close(length, volume, dollarVolume);
            this.models.margins.setMargin(length, newMargin);
        }
    }
}
__decorate([
    (0, injektor_1.inject)(OrderVolumes.TaskDeps)
], OrderVolumes.prototype, "tasks", void 0);
exports.OrderVolumes = OrderVolumes;
(function (OrderVolumes) {
    OrderVolumes.TaskDeps = {};
})(OrderVolumes = exports.OrderVolumes || (exports.OrderVolumes = {}));
//# sourceMappingURL=order-volumes.js.map
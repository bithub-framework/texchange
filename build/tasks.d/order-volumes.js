"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderVolumes = void 0;
const task_1 = require("../task");
class OrderVolumes extends task_1.Task {
    constructor(context, models, broadcast, tasks) {
        super();
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
        this.tasks = tasks;
    }
    open({ length, volume, dollarVolume, }) {
        const newMargin = this.tasks.marginAccumulation.newMarginAfterOpening({
            length,
            volume,
            dollarVolume,
        }).round(this.context.config.market.CURRENCY_DP);
        this.models.assets.open({
            length,
            volume,
            dollarVolume,
        });
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
            this.models.assets.close({
                length,
                volume,
                dollarVolume,
            });
            this.models.margins.setMargin(length, newMargin);
        }
    }
}
exports.OrderVolumes = OrderVolumes;
//# sourceMappingURL=order-volumes.js.map
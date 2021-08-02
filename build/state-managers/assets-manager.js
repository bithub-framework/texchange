"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsManager = exports.default = void 0;
const interfaces_1 = require("../interfaces");
const auto_assets_1 = require("./auto-assets");
const util_1 = require("util");
class AssetsManager extends auto_assets_1.AutoAssets {
    freeze(frozen) {
        this.frozenBalance = this.frozenBalance.plus(frozen.balance);
        this.frozenPosition[frozen.length] = this.frozenPosition[frozen.length].plus(frozen.position);
        if (this.available.lt(0) || this.closable[frozen.length].lt(0)) {
            this.thaw(frozen);
            throw new Error('No enough to freeze');
        }
    }
    thaw(frozen) {
        this.frozenBalance = this.frozenBalance.minus(frozen.balance);
        this.frozenPosition[frozen.length] = this.frozenPosition[frozen.length].minus(frozen.position);
        if (this.frozenBalance.lt(0) || this.frozenPosition[frozen.length].lt(0)) {
            this.freeze(frozen);
            throw new Error('No enough to thaw');
        }
    }
    incMargin(increment) {
        this.marginSum = this.marginSum.plus(increment);
    }
    decMargin(decrement) {
        this.marginSum = this.marginSum.minus(decrement);
    }
    // public decMargin(volume: Big) {
    //     const totalPosition = this.position[Length.LONG].plus(this.position[Length.SHORT]);
    //     this.autoMargin = totalPosition.eq(volume)
    //         ? new Big(0)
    //         : this.autoMargin.minus(
    //             this.config.calcMarginDecrement({
    //                 spec: this.config,
    //                 assets: this,
    //                 volume,
    //             }).round(this.config.CURRENCY_DP),
    //         );
    // }
    openPosition(length, volume, dollarVolume, fee) {
        this.position[length] = this.position[length].plus(volume);
        this.cost[length] = this.cost[length].plus(dollarVolume);
        this.balance = this.balance.minus(fee);
    }
    closePosition(length, volume, dollarVolume, fee) {
        const cost = volume.eq(this.position[length])
            ? this.cost[length]
            : this.config.calcDollarVolume(this.cost[length].div(this.position[length]), volume).round(this.config.CURRENCY_DP);
        const profit = length === interfaces_1.Length.LONG
            ? dollarVolume.minus(cost)
            : cost.minus(dollarVolume);
        this.position[length] = this.position[length].minus(volume);
        this.cost[length] = this.cost[length].minus(cost);
        this.balance = this.balance
            .plus(profit)
            .minus(fee);
    }
    [util_1.inspect.custom]() {
        return this.toJSON();
    }
}
exports.default = AssetsManager;
exports.AssetsManager = AssetsManager;
//# sourceMappingURL=assets-manager.js.map
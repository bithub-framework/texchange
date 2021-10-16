"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateAssets = void 0;
const interfaces_1 = require("../interfaces");
const util_1 = require("util");
const big_js_1 = require("big.js");
class StateAssets {
    constructor(core, snapshot) {
        this.core = core;
        if (snapshot) {
            this.balance = new big_js_1.default(snapshot.balance);
            this.position = {
                [interfaces_1.Length.LONG]: new big_js_1.default(snapshot.position[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: new big_js_1.default(snapshot.position[interfaces_1.Length.SHORT]),
            };
            this.cost = {
                [interfaces_1.Length.LONG]: new big_js_1.default(snapshot.cost[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: new big_js_1.default(snapshot.cost[interfaces_1.Length.SHORT]),
            };
        }
        else {
            this.balance = this.core.config.initialBalance;
            this.position = {
                [interfaces_1.Length.LONG]: new big_js_1.default(0),
                [interfaces_1.Length.SHORT]: new big_js_1.default(0),
            };
            this.cost = {
                [interfaces_1.Length.LONG]: new big_js_1.default(0),
                [interfaces_1.Length.SHORT]: new big_js_1.default(0),
            };
        }
    }
    capture() {
        return {
            position: this.position,
            cost: this.cost,
            balance: this.balance,
        };
    }
    openPosition(length, volume, dollarVolume, fee) {
        this.position[length] = this.position[length].plus(volume);
        this.cost[length] = this.cost[length].plus(dollarVolume);
        this.balance = this.balance.minus(fee);
    }
    closePosition(length, volume, dollarVolume, fee) {
        if (volume.lte(this.position[length])) {
            const cost = this.cost[length]
                .times(volume)
                .div(this.position[length])
                .round(this.core.config.CURRENCY_DP);
            const profit = dollarVolume.minus(cost).times(length);
            this.position[length] = this.position[length].minus(volume);
            this.cost[length] = this.cost[length].minus(cost);
            this.balance = this.balance
                .plus(profit)
                .minus(fee);
            return profit;
        }
        else /* volume.gt(this.position[length]) */ {
            const restVolume = volume.minus(this.position[length]);
            const restDollarVolume = dollarVolume
                .times(restVolume)
                .div(volume)
                .round(this.core.config.CURRENCY_DP);
            const restFee = fee
                .times(restVolume)
                .div(volume)
                .round(this.core.config.CURRENCY_DP);
            const profit = this.closePosition(length, this.position[length], dollarVolume.minus(restDollarVolume), fee.minus(restFee));
            this.openPosition(-length, restVolume, restDollarVolume, restFee);
            return profit;
        }
    }
    [util_1.inspect.custom]() {
        return JSON.stringify({
            balance: this.balance,
            cost: this.cost,
            position: this.position,
        });
    }
}
exports.StateAssets = StateAssets;
//# sourceMappingURL=assets.js.map
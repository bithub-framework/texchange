"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assets = void 0;
const interfaces_1 = require("interfaces");
const model_1 = require("../model");
const assert = require("assert");
class Assets extends model_1.Model {
    constructor(context) {
        super();
        this.context = context;
        this.balance = this.context.config.account.initialBalance;
        this.position = {
            [interfaces_1.Length.LONG]: this.context.H.from(0),
            [interfaces_1.Length.SHORT]: this.context.H.from(0),
        };
        this.cost = {
            [interfaces_1.Length.LONG]: this.context.H.from(0),
            [interfaces_1.Length.SHORT]: this.context.H.from(0),
        };
    }
    getBalance() {
        return this.balance;
    }
    getPosition() {
        return this.position;
    }
    getCost() {
        return this.cost;
    }
    capture() {
        return {
            position: {
                [interfaces_1.Length.LONG]: this.context.H.capture(this.position[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: this.context.H.capture(this.position[interfaces_1.Length.SHORT]),
            },
            cost: {
                [interfaces_1.Length.LONG]: this.context.H.capture(this.cost[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: this.context.H.capture(this.cost[interfaces_1.Length.SHORT]),
            },
            balance: this.context.H.capture(this.balance),
        };
    }
    restore(snapshot) {
        this.balance = this.context.H.from(snapshot.balance);
        this.position = {
            [interfaces_1.Length.LONG]: this.context.H.from(snapshot.position[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: this.context.H.from(snapshot.position[interfaces_1.Length.SHORT]),
        };
        this.cost = {
            [interfaces_1.Length.LONG]: this.context.H.from(snapshot.cost[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: this.context.H.from(snapshot.cost[interfaces_1.Length.SHORT]),
        };
    }
    payFee(fee) {
        this.balance = this.balance.minus(fee);
    }
    open({ length, volume, dollarVolume, }) {
        this.position[length] = this.position[length].plus(volume);
        this.cost[length] = this.cost[length].plus(dollarVolume);
    }
    /**
     * @returns Profit.
     */
    close({ length, volume, dollarVolume, }) {
        assert(volume.lte(this.position[length]));
        const cost = this.cost[length]
            .times(volume)
            .div(this.position[length])
            .round(this.context.config.market.CURRENCY_DP);
        const profit = dollarVolume.minus(cost).times(length);
        this.position[length] = this.position[length].minus(volume);
        this.cost[length] = this.cost[length].minus(cost);
        this.balance = this.balance.plus(profit);
        return profit;
    }
}
exports.Assets = Assets;
//# sourceMappingURL=assets.js.map
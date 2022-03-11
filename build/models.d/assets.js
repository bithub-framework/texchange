"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assets = void 0;
const interfaces_1 = require("interfaces");
const big_js_1 = require("big.js");
const model_1 = require("../model");
const assert = require("assert");
class Assets extends model_1.Model {
    constructor(context) {
        super();
        this.context = context;
        this.balance = this.context.config.account.initialBalance;
        this.position = {
            [interfaces_1.Length.LONG]: new big_js_1.default(0),
            [interfaces_1.Length.SHORT]: new big_js_1.default(0),
        };
        this.cost = {
            [interfaces_1.Length.LONG]: new big_js_1.default(0),
            [interfaces_1.Length.SHORT]: new big_js_1.default(0),
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
                [interfaces_1.Length.LONG]: this.position[interfaces_1.Length.LONG].toString(),
                [interfaces_1.Length.SHORT]: this.position[interfaces_1.Length.SHORT].toString(),
            },
            cost: {
                [interfaces_1.Length.LONG]: this.cost[interfaces_1.Length.LONG].toString(),
                [interfaces_1.Length.SHORT]: this.cost[interfaces_1.Length.SHORT].toString(),
            },
            balance: this.balance.toString(),
        };
    }
    restore(snapshot) {
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
        /* volume.gt(this.position[length]) */ {
            // const restVolume = volume.minus(this.position[length]);
            // const restDollarVolume = dollarVolume
            //     .times(restVolume)
            //     .div(volume)
            //     .round(this.context.config.market.CURRENCY_DP);
            // const profit = this.closePosition({
            //     length,
            //     volume: this.position[length],
            //     dollarVolume: dollarVolume.minus(restDollarVolume),
            // });
            // this.openPosition({
            //     length: -length,
            //     volume: restVolume,
            //     dollarVolume: restDollarVolume,
            // });
            // return profit;
        }
    }
}
exports.Assets = Assets;
//# sourceMappingURL=assets.js.map
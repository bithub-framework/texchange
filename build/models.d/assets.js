"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assets = void 0;
const interfaces_1 = require("interfaces");
const assert = require("assert");
class Assets {
    constructor(context) {
        this.context = context;
        this.Cost = new Assets.CostStatic(this.context.Data.H);
        this.balance = this.context.config.account.initialBalance;
        this.$position = {
            [interfaces_1.Length.LONG]: new this.context.Data.H(0),
            [interfaces_1.Length.SHORT]: new this.context.Data.H(0),
        };
        this.$cost = {
            [interfaces_1.Length.LONG]: new this.context.Data.H(0),
            [interfaces_1.Length.SHORT]: new this.context.Data.H(0),
        };
    }
    getBalance() {
        return this.balance;
    }
    getPosition() {
        return this.context.Data.Position.copy(this.$position);
    }
    getCost() {
        return this.Cost.copy(this.$cost);
    }
    capture() {
        return {
            position: this.context.Data.Position.capture(this.$position),
            cost: this.Cost.capture(this.$cost),
            balance: this.context.Data.H.capture(this.balance),
        };
    }
    restore(snapshot) {
        this.balance = this.context.Data.H.restore(snapshot.balance);
        this.$position = this.context.Data.Position.restore(snapshot.position);
        this.$cost = this.Cost.restore(snapshot.cost);
    }
    pay(fee) {
        this.balance = this.balance.minus(fee);
    }
    open(length, volume, dollarVolume) {
        this.$position[length] = this.$position[length].plus(volume);
        this.$cost[length] = this.$cost[length].plus(dollarVolume);
    }
    /**
     * @returns Profit.
     */
    close(length, volume, dollarVolume) {
        assert(volume.lte(this.$position[length]));
        const cost = this.$cost[length]
            .times(volume)
            .div(this.$position[length])
            .round(this.context.config.market.CURRENCY_DP);
        const profit = dollarVolume.minus(cost).times(length);
        this.$position[length] = this.$position[length].minus(volume);
        this.$cost[length] = this.$cost[length].minus(cost);
        this.balance = this.balance.plus(profit);
        return profit;
    }
}
exports.Assets = Assets;
(function (Assets) {
    class CostStatic {
        constructor(H) {
            this.H = H;
        }
        capture(cost) {
            return {
                [interfaces_1.Length.LONG]: this.H.capture(cost[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: this.H.capture(cost[interfaces_1.Length.SHORT]),
            };
        }
        restore(snapshot) {
            return {
                [interfaces_1.Length.LONG]: this.H.restore(snapshot[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: this.H.restore(snapshot[interfaces_1.Length.SHORT]),
            };
        }
        copy(cost) {
            return {
                [interfaces_1.Length.LONG]: cost[interfaces_1.Length.LONG],
                [interfaces_1.Length.SHORT]: cost[interfaces_1.Length.SHORT],
            };
        }
    }
    Assets.CostStatic = CostStatic;
})(Assets = exports.Assets || (exports.Assets = {}));
//# sourceMappingURL=assets.js.map
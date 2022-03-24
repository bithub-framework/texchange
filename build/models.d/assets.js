"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assets = void 0;
const interfaces_1 = require("interfaces");
const assert = require("assert");
class Assets {
    constructor(context) {
        this.context = context;
        this.Position = new interfaces_1.PositionStatic(this.context.H);
        this.Cost = new Assets.CostStatic(this.context.H);
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
            position: this.Position.capture(this.position),
            cost: this.Cost.capture(this.cost),
            balance: this.context.H.capture(this.balance),
        };
    }
    restore(snapshot) {
        this.balance = this.context.H.from(snapshot.balance);
        this.position = this.Position.restore(snapshot.position);
        this.cost = this.Cost.restore(snapshot.cost);
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
                [interfaces_1.Length.LONG]: this.H.from(snapshot[interfaces_1.Length.LONG]),
                [interfaces_1.Length.SHORT]: this.H.from(snapshot[interfaces_1.Length.SHORT]),
            };
        }
    }
    Assets.CostStatic = CostStatic;
})(Assets = exports.Assets || (exports.Assets = {}));
//# sourceMappingURL=assets.js.map
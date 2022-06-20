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
exports.Assets = void 0;
const secretary_like_1 = require("secretary-like");
const assert = require("assert");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/types");
let Assets = class Assets {
    constructor(context, marketSpec, balance) {
        this.context = context;
        this.marketSpec = marketSpec;
        this.balance = balance;
        this.Cost = new Assets.CostStatic(this.context.Data.H);
        this.$position = {
            [secretary_like_1.Length.LONG]: new this.context.Data.H(0),
            [secretary_like_1.Length.SHORT]: new this.context.Data.H(0),
        };
        this.$cost = {
            [secretary_like_1.Length.LONG]: new this.context.Data.H(0),
            [secretary_like_1.Length.SHORT]: new this.context.Data.H(0),
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
    open({ length, volume, dollarVolume, }) {
        this.$position[length] = this.$position[length].plus(volume);
        this.$cost[length] = this.$cost[length].plus(dollarVolume);
    }
    /**
     *
     * @returns Profit
     */
    close({ length, volume, dollarVolume, }) {
        assert(volume.lte(this.$position[length]));
        const cost = this.$cost[length]
            .times(volume)
            .div(this.$position[length])
            .round(this.marketSpec.CURRENCY_DP);
        const profit = dollarVolume.minus(cost).times(length);
        this.$position[length] = this.$position[length].minus(volume);
        this.$cost[length] = this.$cost[length].minus(cost);
        this.balance = this.balance.plus(profit);
        return profit;
    }
    /**
     * @returns Profit
     */
    settle(length, settlementPrice) {
        const dollarVolume = this.marketSpec.dollarVolume(settlementPrice, this.$position[length]).round(this.marketSpec.CURRENCY_DP);
        const executed = {
            length,
            volume: this.$position[length],
            dollarVolume,
        };
        const profit = this.close(executed);
        this.open(executed);
        return profit;
    }
};
Assets = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.MODELS.initialBalance))
], Assets);
exports.Assets = Assets;
(function (Assets) {
    class CostStatic {
        constructor(H) {
            this.H = H;
        }
        capture(cost) {
            return {
                [secretary_like_1.Length.LONG]: this.H.capture(cost[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: this.H.capture(cost[secretary_like_1.Length.SHORT]),
            };
        }
        restore(snapshot) {
            return {
                [secretary_like_1.Length.LONG]: this.H.restore(snapshot[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: this.H.restore(snapshot[secretary_like_1.Length.SHORT]),
            };
        }
        copy(cost) {
            return {
                [secretary_like_1.Length.LONG]: cost[secretary_like_1.Length.LONG],
                [secretary_like_1.Length.SHORT]: cost[secretary_like_1.Length.SHORT],
            };
        }
    }
    Assets.CostStatic = CostStatic;
})(Assets = exports.Assets || (exports.Assets = {}));
exports.Assets = Assets;
//# sourceMappingURL=assets.js.map
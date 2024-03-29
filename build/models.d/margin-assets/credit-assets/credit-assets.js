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
exports.CreditAssets = void 0;
const secretary_like_1 = require("secretary-like");
const cost_1 = require("./cost");
const assert = require("assert");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../../injection/types");
let CreditAssets = class CreditAssets {
    constructor(vmctx, marketSpec, balance) {
        this.vmctx = vmctx;
        this.marketSpec = marketSpec;
        this.balance = balance;
        this.Cost = new cost_1.CostFactory(this.vmctx.DataTypes.hFactory);
        this.$position = this.vmctx.DataTypes.positionFactory.create({
            [secretary_like_1.Length.LONG]: this.vmctx.DataTypes.hFactory.from(0),
            [secretary_like_1.Length.SHORT]: this.vmctx.DataTypes.hFactory.from(0),
        });
        this.$cost = {
            [secretary_like_1.Length.LONG]: this.vmctx.DataTypes.hFactory.from(0),
            [secretary_like_1.Length.SHORT]: this.vmctx.DataTypes.hFactory.from(0)
        };
    }
    getBalance() {
        return this.balance;
    }
    getPosition() {
        return this.vmctx.DataTypes.positionFactory.create(this.$position);
    }
    getCost() {
        return this.Cost.copy(this.$cost);
    }
    capture() {
        return {
            position: this.vmctx.DataTypes.positionFactory.capture(this.$position),
            cost: this.Cost.capture(this.$cost),
            balance: this.vmctx.DataTypes.hFactory.capture(this.balance),
        };
    }
    restore(snapshot) {
        this.balance = this.vmctx.DataTypes.hFactory.restore(snapshot.balance);
        this.$position = this.vmctx.DataTypes.positionFactory.restore(snapshot.position);
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
        const cost = this.$position[length].neq(0)
            ? this.$cost[length]
                .times(volume)
                .div(this.$position[length], this.marketSpec.CURRENCY_SCALE)
            : this.vmctx.DataTypes.hFactory.from(0);
        const profit = dollarVolume.minus(cost)
            .times(length === secretary_like_1.Length.LONG ? 1 : -1);
        this.$position[length] = this.$position[length].minus(volume);
        this.$cost[length] = this.$cost[length].minus(cost);
        this.balance = this.balance.plus(profit);
        return profit;
    }
    /**
     * @returns Profit
     */
    settle(length, settlementPrice) {
        const dollarVolume = this.marketSpec.dollarVolume(settlementPrice, this.$position[length]);
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
CreditAssets = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.vmctx)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.MODELS.initialBalance))
], CreditAssets);
exports.CreditAssets = CreditAssets;
//# sourceMappingURL=credit-assets.js.map
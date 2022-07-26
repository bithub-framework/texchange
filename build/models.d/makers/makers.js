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
exports.Makers = void 0;
const secretary_like_1 = require("secretary-like");
const frozen_balance_1 = require("../../interfaces/frozen/frozen-balance");
const total_unfilled_1 = require("./total-unfilled");
const assert = require("assert");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/types");
let Makers = class Makers {
    constructor(context, marketSpec) {
        this.context = context;
        this.marketSpec = marketSpec;
        this.$orders = new Map();
        this.$totalUnfilled = new total_unfilled_1.TotalUnfilled(context.Data.H.from(0), context.Data.H.from(0));
        this.TotalUnfilled = new total_unfilled_1.TotalUnfilledStatic(context.Data.H);
        this.totalFrozen = context.Data.Frozen.ZERO;
    }
    getTotalUnfilled() {
        return this.TotalUnfilled.copy(this.$totalUnfilled);
    }
    getTotalFrozen() {
        return this.totalFrozen;
    }
    [Symbol.iterator]() {
        return [...this.$orders.values()][Symbol.iterator]();
    }
    getOrder(oid) {
        const $order = this.$getOrder(oid);
        return this.context.Data.OpenMaker.copy($order);
    }
    $getOrder(oid) {
        const order = this.$orders.get(oid);
        assert(typeof order !== 'undefined');
        return order;
    }
    capture() {
        return [...this.$orders.keys()].map(oid => this.context.Data.OpenMaker.capture(this.$orders.get(oid)));
    }
    restore(snapshot) {
        for (const orderSnapshot of snapshot) {
            const order = this.context.Data.OpenMaker.restore(orderSnapshot);
            this.$orders.set(order.id, order);
        }
        for (const side of [secretary_like_1.Side.ASK, secretary_like_1.Side.BID]) {
            this.$totalUnfilled.set(side, [...this.$orders.values()]
                .filter(order => order.side === side)
                .reduce((total, order) => total.plus(order.unfilled), this.context.Data.H.from(0)));
        }
        this.totalFrozen = [...this.$orders.values()]
            .reduce((total, order) => this.context.Data.Frozen.plus(total, order.frozen), this.context.Data.Frozen.ZERO);
    }
    normalizeFrozen(frozen) {
        return {
            balance: new frozen_balance_1.FrozenBalance(frozen.balance.get(secretary_like_1.Length.LONG).round(this.marketSpec.CURRENCY_DP), frozen.balance.get(secretary_like_1.Length.SHORT).round(this.marketSpec.CURRENCY_DP)),
            position: new secretary_like_1.Position(frozen.position.get(secretary_like_1.Length.LONG).round(this.marketSpec.QUANTITY_DP), frozen.position.get(secretary_like_1.Length.SHORT).round(this.marketSpec.QUANTITY_DP)),
        };
    }
    appendOrder(order, behind) {
        assert(order.unfilled.gt(0));
        const toFreeze = this.normalizeFrozen(this.toFreeze(order));
        const $order = {
            ...this.context.Data.OpenOrder.copyOpenOrder(order),
            behind,
            frozen: toFreeze,
        };
        this.$orders.set(order.id, $order);
        this.totalFrozen = this.context.Data.Frozen.plus(this.totalFrozen, toFreeze);
        this.$totalUnfilled.set(order.side, this.$totalUnfilled.get(order.side)
            .plus(order.unfilled));
    }
    takeOrder(oid, volume) {
        const $order = this.$getOrder(oid);
        assert(volume.lte($order.unfilled));
        assert($order.behind.eq(0));
        this.forcedlyRemoveOrder(oid);
        const newOrder = {
            ...this.context.Data.OpenOrder.copyOpenOrder($order),
            filled: $order.filled.plus(volume),
            unfilled: $order.unfilled.minus(volume),
        };
        if (newOrder.unfilled.gt(0))
            this.appendOrder(newOrder, this.context.Data.H.from(0));
    }
    takeOrderQueue(oid, volume) {
        const $order = this.$getOrder(oid);
        if (typeof volume !== 'undefined')
            assert(volume.lte($order.behind));
        $order.behind = typeof volume !== 'undefined'
            ? $order.behind.minus(volume)
            : this.context.Data.H.from(0);
        this.$orders.set(oid, $order);
    }
    removeOrder(oid) {
        const $order = this.$getOrder(oid);
        this.$orders.delete(oid);
        this.$totalUnfilled.set($order.side, this.$totalUnfilled.get($order.side)
            .minus($order.unfilled));
        this.totalFrozen = this.context.Data.Frozen.minus(this.totalFrozen, $order.frozen);
    }
    forcedlyRemoveOrder(oid) {
        try {
            this.removeOrder(oid);
        }
        catch (err) { }
    }
};
Makers = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec))
], Makers);
exports.Makers = Makers;
//# sourceMappingURL=makers.js.map
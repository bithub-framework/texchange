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
const total_unfilled_1 = require("./total-unfilled");
const assert = require("assert");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/types");
let Makers = class Makers {
    constructor(context, marketSpec, accountSpec) {
        this.context = context;
        this.marketSpec = marketSpec;
        this.accountSpec = accountSpec;
        this.$orders = new Map();
        this.$totalUnfilled = {
            [secretary_like_1.Side.BID]: context.DataTypes.hFactory.from(0),
            [secretary_like_1.Side.ASK]: context.DataTypes.hFactory.from(0),
        };
        this.totalUnfilledFactory = new total_unfilled_1.TotalUnfilledFactory();
        this.totalFrozen = context.DataTypes.Frozen.ZERO;
    }
    getTotalUnfilled() {
        return this.totalUnfilledFactory.copy(this.$totalUnfilled);
    }
    getTotalFrozen() {
        return this.totalFrozen;
    }
    [Symbol.iterator]() {
        return [...this.$orders.values()][Symbol.iterator]();
    }
    getOrder(oid) {
        const $order = this.$getOrder(oid);
        return this.context.DataTypes.OpenMaker.copy($order);
    }
    $getOrder(oid) {
        const order = this.$orders.get(oid);
        assert(typeof order !== 'undefined');
        return order;
    }
    capture() {
        return [...this.$orders.keys()].map(oid => this.context.DataTypes.OpenMaker.capture(this.$orders.get(oid)));
    }
    restore(snapshot) {
        for (const orderSnapshot of snapshot) {
            const order = this.context.DataTypes.OpenMaker.restore(orderSnapshot);
            this.$orders.set(order.id, order);
        }
        for (const side of [secretary_like_1.Side.ASK, secretary_like_1.Side.BID]) {
            this.$totalUnfilled[side] = [...this.$orders.values()]
                .filter(order => order.side === side)
                .reduce((total, order) => total.plus(order.unfilled), this.context.DataTypes.hFactory.from(0));
        }
        this.totalFrozen = [...this.$orders.values()]
            .reduce((total, order) => this.context.DataTypes.Frozen.plus(total, order.frozen), this.context.DataTypes.Frozen.ZERO);
    }
    appendOrder(order, behind) {
        assert(order.unfilled.gt(0));
        const toFreeze = this.toFreeze(order);
        const $order = {
            ...this.context.DataTypes.openOrderFactory.copy(order),
            behind,
            frozen: toFreeze,
        };
        this.$orders.set(order.id, $order);
        this.totalFrozen = this.context.DataTypes.Frozen.plus(this.totalFrozen, toFreeze);
        this.$totalUnfilled[order.side] = this.$totalUnfilled[order.side]
            .plus(order.unfilled);
    }
    takeOrder(oid, volume) {
        const $order = this.$getOrder(oid);
        assert(volume.lte($order.unfilled));
        assert($order.behind.eq(0));
        this.forcedlyRemoveOrder(oid);
        const newOrder = {
            ...this.context.DataTypes.openOrderFactory.copy($order),
            filled: $order.filled.plus(volume),
            unfilled: $order.unfilled.minus(volume),
        };
        if (newOrder.unfilled.gt(0))
            this.appendOrder(newOrder, this.context.DataTypes.hFactory.from(0));
    }
    takeOrderQueue(oid, volume) {
        const $order = this.$getOrder(oid);
        if (typeof volume !== 'undefined')
            assert(volume.lte($order.behind));
        $order.behind = typeof volume !== 'undefined'
            ? $order.behind.minus(volume)
            : this.context.DataTypes.hFactory.from(0);
        this.$orders.set(oid, $order);
    }
    removeOrder(oid) {
        const $order = this.$getOrder(oid);
        this.$orders.delete(oid);
        this.$totalUnfilled[$order.side] = this.$totalUnfilled[$order.side]
            .minus($order.unfilled);
        this.totalFrozen = this.context.DataTypes.Frozen.minus(this.totalFrozen, $order.frozen);
    }
    forcedlyRemoveOrder(oid) {
        try {
            this.removeOrder(oid);
        }
        catch (err) { }
    }
};
Makers = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.vmctx)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.accountSpec))
], Makers);
exports.Makers = Makers;
//# sourceMappingURL=makers.js.map
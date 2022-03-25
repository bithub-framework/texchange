"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Makers = void 0;
const interfaces_1 = require("interfaces");
const frozon_1 = require("./frozon");
const assert = require("assert");
class Makers {
    constructor(context) {
        this.context = context;
        this.$orders = new Map();
        this.$frozens = new Map();
        this.$totalUnfilled = {
            [interfaces_1.Side.ASK]: this.context.H.from(0),
            [interfaces_1.Side.BID]: this.context.H.from(0),
        };
        this.OrderId = new interfaces_1.TexchangeOrderIdStatic();
        this.OpenMaker = new interfaces_1.TexchangeOpenMakerStatic(this.context.H, this.OrderId);
        this.Frozen = new frozon_1.FrozenStatic(this.context.H);
        this.TotalUnfilled = new Makers.TotalUnfilledStatic(this.context.H);
        this.totalFrozen = this.Frozen.ZERO;
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
    getOrder(id) {
        const order = this.$orders.get(id);
        assert(typeof order !== 'undefined');
        return order;
    }
    // TODO zap
    capture() {
        return [...this.$orders.keys()]
            .map(oid => ({
            order: this.OpenMaker.capture(this.$orders.get(oid)),
            frozen: this.Frozen.capture(this.$frozens.get(oid)),
        }));
    }
    restore(snapshot) {
        for (const { order: orderSnapshot, frozen: frozenSnapshot, } of snapshot) {
            const order = this.OpenMaker.restore(orderSnapshot);
            const frozen = this.Frozen.restore(frozenSnapshot);
            this.$orders.set(order.id, order);
            this.$frozens.set(order.id, frozen);
        }
        for (const side of [interfaces_1.Side.ASK, interfaces_1.Side.BID]) {
            this.$totalUnfilled[side] = [...this.$orders.values()]
                .filter(order => order.side === side)
                .reduce((total, order) => total.plus(order.unfilled), this.context.H.from(0));
        }
        this.totalFrozen = [...this.$frozens.values()]
            .reduce((total, frozen) => this.Frozen.plus(total, frozen), this.Frozen.ZERO);
    }
    normalizeFrozen(frozen) {
        return {
            balance: {
                [interfaces_1.Length.LONG]: frozen.balance[interfaces_1.Length.LONG].round(this.context.config.market.CURRENCY_DP),
                [interfaces_1.Length.SHORT]: frozen.balance[interfaces_1.Length.SHORT].round(this.context.config.market.CURRENCY_DP),
            },
            position: {
                [interfaces_1.Length.LONG]: frozen.position[interfaces_1.Length.LONG].round(this.context.config.market.QUANTITY_DP),
                [interfaces_1.Length.SHORT]: frozen.position[interfaces_1.Length.SHORT].round(this.context.config.market.QUANTITY_DP),
            },
        };
    }
    appendOrder(order) {
        assert(order.unfilled.gt(0));
        const toFreeze = this.normalizeFrozen(this.toFreeze(order));
        this.$orders.set(order.id, order);
        this.$frozens.set(order.id, toFreeze);
        this.totalFrozen = this.Frozen.plus(this.totalFrozen, toFreeze);
        this.$totalUnfilled[order.side] = this.$totalUnfilled[order.side]
            .plus(order.unfilled);
    }
    takeOrder(oid, volume) {
        const order = this.getOrder(oid);
        assert(volume.lte(order.unfilled));
        assert(order.behind.eq(0));
        this.forcedlyRemoveOrder(oid);
        const newOrder = {
            ...order,
            filled: order.filled.plus(volume),
            unfilled: order.unfilled.minus(volume),
        };
        this.appendOrder(newOrder);
    }
    takeOrderQueue(oid, volume) {
        const order = this.getOrder(oid);
        if (typeof volume !== 'undefined')
            assert(volume.lte(order.behind));
        const newOrder = {
            ...order,
            behind: typeof volume !== 'undefined'
                ? order.behind.minus(volume)
                : this.context.H.from(0),
        };
        this.$orders.set(oid, newOrder);
    }
    removeOrder(oid) {
        const order = this.getOrder(oid);
        const toThaw = this.$frozens.get(oid);
        this.$orders.delete(oid);
        this.$frozens.delete(oid);
        this.$totalUnfilled[order.side] = this.$totalUnfilled[order.side]
            .minus(order.unfilled);
        this.totalFrozen = this.Frozen.minus(this.totalFrozen, toThaw);
    }
    forcedlyRemoveOrder(oid) {
        try {
            this.removeOrder(oid);
        }
        catch (err) { }
    }
}
exports.Makers = Makers;
(function (Makers) {
    class TotalUnfilledStatic {
        constructor(H) {
            this.H = H;
        }
        copy(totalUnfilled) {
            return {
                [interfaces_1.Side.ASK]: totalUnfilled[interfaces_1.Side.ASK],
                [interfaces_1.Side.BID]: totalUnfilled[interfaces_1.Side.BID],
            };
        }
    }
    Makers.TotalUnfilledStatic = TotalUnfilledStatic;
})(Makers = exports.Makers || (exports.Makers = {}));
//# sourceMappingURL=makers.js.map
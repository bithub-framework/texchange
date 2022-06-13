"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Makers = void 0;
const secretary_like_1 = require("secretary-like");
const assert = require("assert");
class Makers {
    constructor(context) {
        this.context = context;
        this.$orders = new Map();
        this.$totalUnfilled = {
            [secretary_like_1.Side.ASK]: new this.context.Data.H(0),
            [secretary_like_1.Side.BID]: new this.context.Data.H(0),
        };
        this.TotalUnfilled = new Makers.TotalUnfilledStatic(this.context.Data.H);
        this.totalFrozen = this.context.Data.Frozen.ZERO;
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
            this.$totalUnfilled[side] = [...this.$orders.values()]
                .filter(order => order.side === side)
                .reduce((total, order) => total.plus(order.unfilled), new this.context.Data.H(0));
        }
        this.totalFrozen = [...this.$orders.values()]
            .reduce((total, order) => this.context.Data.Frozen.plus(total, order.frozen), this.context.Data.Frozen.ZERO);
    }
    normalizeFrozen(frozen) {
        return {
            balance: {
                [secretary_like_1.Length.LONG]: frozen.balance[secretary_like_1.Length.LONG].round(this.context.spec.market.CURRENCY_DP),
                [secretary_like_1.Length.SHORT]: frozen.balance[secretary_like_1.Length.SHORT].round(this.context.spec.market.CURRENCY_DP),
            },
            position: {
                [secretary_like_1.Length.LONG]: frozen.position[secretary_like_1.Length.LONG].round(this.context.spec.market.QUANTITY_DP),
                [secretary_like_1.Length.SHORT]: frozen.position[secretary_like_1.Length.SHORT].round(this.context.spec.market.QUANTITY_DP),
            },
        };
    }
    appendOrder(order, behind) {
        assert(order.unfilled.gt(0));
        const toFreeze = this.normalizeFrozen(this.toFreeze(order));
        const $order = {
            ...this.context.Data.OpenOrder.copy(order),
            behind,
            frozen: toFreeze,
        };
        this.$orders.set(order.id, $order);
        this.totalFrozen = this.context.Data.Frozen.plus(this.totalFrozen, toFreeze);
        this.$totalUnfilled[order.side] = this.$totalUnfilled[order.side]
            .plus(order.unfilled);
    }
    takeOrder(oid, volume) {
        const $order = this.$getOrder(oid);
        assert(volume.lte($order.unfilled));
        assert($order.behind.eq(0));
        this.forcedlyRemoveOrder(oid);
        const newOrder = {
            ...this.context.Data.OpenOrder.copy($order),
            filled: $order.filled.plus(volume),
            unfilled: $order.unfilled.minus(volume),
        };
        if (newOrder.unfilled.gt(0))
            this.appendOrder(newOrder, new this.context.Data.H(0));
    }
    takeOrderQueue(oid, volume) {
        const $order = this.$getOrder(oid);
        if (typeof volume !== 'undefined')
            assert(volume.lte($order.behind));
        $order.behind = typeof volume !== 'undefined'
            ? $order.behind.minus(volume)
            : new this.context.Data.H(0);
        this.$orders.set(oid, $order);
    }
    removeOrder(oid) {
        const $order = this.$getOrder(oid);
        this.$orders.delete(oid);
        this.$totalUnfilled[$order.side] = this.$totalUnfilled[$order.side]
            .minus($order.unfilled);
        this.totalFrozen = this.context.Data.Frozen.minus(this.totalFrozen, $order.frozen);
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
                [secretary_like_1.Side.ASK]: totalUnfilled[secretary_like_1.Side.ASK],
                [secretary_like_1.Side.BID]: totalUnfilled[secretary_like_1.Side.BID],
            };
        }
    }
    Makers.TotalUnfilledStatic = TotalUnfilledStatic;
})(Makers = exports.Makers || (exports.Makers = {}));
//# sourceMappingURL=makers.js.map
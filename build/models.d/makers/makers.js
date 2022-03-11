"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Makers = void 0;
const interfaces_1 = require("interfaces");
const frozon_1 = require("./frozon");
const model_1 = require("../../model");
const big_js_1 = require("big.js");
const assert = require("assert");
class Makers extends model_1.Model {
    constructor() {
        super(...arguments);
        this.orders = new Map();
        this.frozens = new Map();
        this.totalUnfilledQuantity = {
            [interfaces_1.Side.ASK]: new big_js_1.default(0),
            [interfaces_1.Side.BID]: new big_js_1.default(0),
        };
        this.totalFrozen = frozon_1.Frozen.ZERO;
    }
    [Symbol.iterator]() {
        return this.orders.values();
    }
    getOrder(id) {
        const order = this.orders.get(id);
        assert(order);
        return order;
    }
    capture() {
        return [...this.orders.keys()]
            .map(oid => ({
            order: interfaces_1.OpenMaker.jsonCompatiblize(this.orders.get(oid)),
            frozen: frozon_1.Frozen.jsonCompatiblize(this.frozens.get(oid)),
        }));
    }
    restore(snapshot) {
        for (const { order, frozen } of snapshot) {
            this.orders.set(order.id, {
                price: new big_js_1.default(order.price),
                quantity: new big_js_1.default(order.quantity),
                side: order.side,
                length: order.length,
                operation: order.operation,
                filled: new big_js_1.default(order.filled),
                unfilled: new big_js_1.default(order.unfilled),
                id: order.id,
                behind: new big_js_1.default(order.behind),
            });
            this.frozens.set(order.id, {
                balance: {
                    [interfaces_1.Length.LONG]: new big_js_1.default(frozen.balance[interfaces_1.Length.LONG]),
                    [interfaces_1.Length.SHORT]: new big_js_1.default(frozen.balance[interfaces_1.Length.SHORT]),
                },
                position: {
                    [interfaces_1.Length.LONG]: new big_js_1.default(frozen.position[interfaces_1.Length.LONG]),
                    [interfaces_1.Length.SHORT]: new big_js_1.default(frozen.position[interfaces_1.Length.SHORT]),
                },
            });
        }
        for (const side of [interfaces_1.Side.ASK, interfaces_1.Side.BID]) {
            this.totalUnfilledQuantity[side] = [...this.orders.values()]
                .filter(order => order.side === side)
                .reduce((total, order) => total.plus(order.unfilled), new big_js_1.default(0));
        }
        this.totalFrozen = [...this.frozens.values()]
            .reduce((total, frozen) => frozon_1.Frozen.plus(total, frozen), frozon_1.Frozen.ZERO);
    }
    normalizeFrozen(frozen) {
        return {
            balance: {
                [interfaces_1.Length.LONG]: frozen.balance[interfaces_1.Length.LONG].round(this.context.config.market.CURRENCY_DP),
                [interfaces_1.Length.SHORT]: frozen.balance[interfaces_1.Length.SHORT].round(this.context.config.market.CURRENCY_DP),
            },
            position: {
                [interfaces_1.Length.LONG]: frozen.position[interfaces_1.Length.LONG].round(this.context.config.market.CURRENCY_DP),
                [interfaces_1.Length.SHORT]: frozen.position[interfaces_1.Length.SHORT].round(this.context.config.market.CURRENCY_DP),
            },
        };
    }
    appendOrder(order) {
        if (order.unfilled.eq(0))
            return;
        const toFreeze = this.normalizeFrozen(this.toFreeze(order));
        this.orders.set(order.id, order);
        this.frozens.set(order.id, toFreeze);
        this.totalFrozen = frozon_1.Frozen.plus(this.totalFrozen, toFreeze);
        this.totalUnfilledQuantity[order.side] = this.totalUnfilledQuantity[order.side]
            .plus(order.unfilled);
    }
    takeOrder(oid, volume) {
        const order = this.orders.get(oid);
        assert(order);
        assert(volume.lte(order.unfilled));
        this.tryRemoveOrder(oid);
        const newOrder = {
            ...order,
            filled: order.filled.plus(volume),
            unfilled: order.unfilled.minus(volume),
        };
        this.appendOrder(newOrder);
    }
    takeOrderQueue(oid, volume) {
        const order = this.orders.get(oid);
        assert(order);
        const newOrder = {
            ...order,
            behind: volume ? order.behind.minus(volume) : new big_js_1.default(0),
        };
        this.orders.set(oid, newOrder);
    }
    removeOrder(oid) {
        const order = this.orders.get(oid);
        assert(order);
        const toThaw = this.frozens.get(oid);
        this.orders.delete(oid);
        this.frozens.delete(oid);
        this.totalUnfilledQuantity[order.side] = this.totalUnfilledQuantity[order.side]
            .minus(order.unfilled);
        this.totalFrozen = frozon_1.Frozen.minus(this.totalFrozen, toThaw);
    }
    tryRemoveOrder(oid) {
        try {
            this.removeOrder(oid);
        }
        catch (err) { }
    }
}
exports.Makers = Makers;
//# sourceMappingURL=makers.js.map
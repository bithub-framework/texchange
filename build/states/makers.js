"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMakers = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
class StateMakers extends Map {
    constructor(core) {
        super();
        this.core = core;
        this.frozens = new Map();
        this.totalUnfilled = {
            [interfaces_1.Side.ASK]: new big_js_1.default(0),
            [interfaces_1.Side.BID]: new big_js_1.default(0),
        };
    }
    capture() {
        return [...this.keys()]
            .map(oid => ({
            order: this.get(oid),
            frozen: this.frozens.get(oid),
        }));
    }
    restore(snapshot) {
        for (const { order, frozen } of snapshot) {
            this.set(order.id, {
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
            this.totalUnfilled[side] = [...this.values()]
                .filter(order => order.side === side)
                .reduce((total, order) => total.plus(order.unfilled), new big_js_1.default(0));
        }
    }
    normalizeFrozen(frozen) {
        return {
            balance: {
                [interfaces_1.Length.LONG]: frozen.balance[interfaces_1.Length.LONG].round(this.core.config.CURRENCY_DP),
                [interfaces_1.Length.SHORT]: frozen.balance[interfaces_1.Length.SHORT].round(this.core.config.CURRENCY_DP),
            },
            position: {
                [interfaces_1.Length.LONG]: frozen.position[interfaces_1.Length.LONG].round(this.core.config.CURRENCY_DP),
                [interfaces_1.Length.SHORT]: frozen.position[interfaces_1.Length.SHORT].round(this.core.config.CURRENCY_DP),
            },
        };
    }
    appendOrder(order) {
        const toFreeze = this.normalizeFrozen(this.core.calculation.toFreeze(order));
        this.totalUnfilled[order.side] = this.totalUnfilled[order.side]
            .plus(order.unfilled);
        if (order.unfilled.gt(0)) {
            this.set(order.id, order);
            this.frozens.set(order.id, toFreeze);
        }
        return toFreeze;
    }
    takeOrder(oid, volume) {
        const order = this.get(oid);
        assert(order);
        assert(volume.lte(order.unfilled));
        const toThaw = this.removeOrder(oid);
        order.filled = order.filled.plus(volume);
        order.unfilled = order.unfilled.minus(volume);
        const toFreeze = this.appendOrder(order);
        return interfaces_1.Frozen.plus(toThaw, toFreeze);
    }
    removeOrder(oid) {
        const order = this.get(oid);
        if (!order)
            return null;
        const frozen = this.frozens.get(oid);
        this.delete(oid);
        this.frozens.delete(oid);
        this.totalUnfilled[order.side] = this.totalUnfilled[order.side]
            .minus(order.unfilled);
        return frozen;
    }
}
exports.StateMakers = StateMakers;
//# sourceMappingURL=makers.js.map
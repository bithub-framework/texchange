"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMakers = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
class StateMakers extends Map {
    constructor(core, snapshot) {
        super();
        this.core = core;
        this.frozens = new Map();
        this.totalQuantity = {};
        if (snapshot)
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
                    balance: new big_js_1.default(frozen.balance),
                    position: {
                        [interfaces_1.Length.LONG]: new big_js_1.default(frozen.position[interfaces_1.Length.LONG]),
                        [interfaces_1.Length.SHORT]: new big_js_1.default(frozen.position[interfaces_1.Length.SHORT]),
                    },
                });
            }
        for (const side of [interfaces_1.Side.ASK, interfaces_1.Side.BID]) {
            this.totalQuantity[side] = [...this.values()]
                .filter(order => order.side === side)
                .reduce((total, order) => total.plus(order.unfilled), new big_js_1.default(0));
        }
    }
    capture() {
        return [...this.keys()]
            .map(oid => ({
            order: this.get(oid),
            frozen: this.frozens.get(oid),
        }));
    }
    addOrder(order) {
        const toFreeze = this.core.calculation.toFreeze(order);
        toFreeze.balance = toFreeze.balance.round(this.core.config.CURRENCY_DP);
        toFreeze.position[interfaces_1.Length.LONG] = toFreeze.position[interfaces_1.Length.LONG].round(this.core.config.CURRENCY_DP);
        toFreeze.position[interfaces_1.Length.SHORT] = toFreeze.position[interfaces_1.Length.SHORT].round(this.core.config.CURRENCY_DP);
        if (order.unfilled.gt(0)) {
            this.set(order.id, order);
            this.frozens.set(order.id, toFreeze);
        }
        return toFreeze;
    }
    takeOrder(oid, volume, dollarVolume) {
        const order = this.get(oid);
        assert(order);
        const frozen = this.frozens.get(oid);
        assert(volume.lte(order.unfilled));
        const toThaw = this.core.calculation.toThaw(order, frozen, volume, dollarVolume);
        toThaw.balance = toThaw.balance.round(this.core.config.CURRENCY_DP);
        toThaw.position[interfaces_1.Length.LONG] = toThaw.position[interfaces_1.Length.LONG].round(this.core.config.CURRENCY_DP);
        toThaw.position[interfaces_1.Length.SHORT] = toThaw.position[interfaces_1.Length.SHORT].round(this.core.config.CURRENCY_DP);
        frozen.balance = frozen.balance.minus(toThaw.balance);
        frozen.position[interfaces_1.Length.LONG] = frozen.position[interfaces_1.Length.LONG]
            .minus(toThaw.position[interfaces_1.Length.LONG]);
        frozen.position[interfaces_1.Length.SHORT] = frozen.position[interfaces_1.Length.SHORT]
            .minus(toThaw.position[interfaces_1.Length.SHORT]);
        order.filled = order.filled.plus(volume);
        order.unfilled = order.unfilled.minus(volume);
        if (order.unfilled.eq(0)) {
            this.delete(oid);
            this.frozens.delete(oid);
        }
        return toThaw;
    }
    removeOrder(oid) {
        const order = this.get(oid);
        const frozen = this.frozens.get(oid);
        if (!order)
            return null;
        this.delete(oid);
        this.frozens.delete(oid);
        return frozen;
    }
}
exports.StateMakers = StateMakers;
//# sourceMappingURL=makers.js.map
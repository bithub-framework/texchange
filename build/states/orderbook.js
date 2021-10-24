"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateOrderbook = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
class StateOrderbook {
    constructor(core) {
        this.core = core;
        this.time = Number.NEGATIVE_INFINITY;
        this.orderbook = {
            [interfaces_1.Side.ASK]: [],
            [interfaces_1.Side.BID]: [],
            time: Number.NEGATIVE_INFINITY,
        };
        this.applied = true;
        this.basebook = {
            [interfaces_1.Side.ASK]: [],
            [interfaces_1.Side.BID]: [],
            time: Number.NEGATIVE_INFINITY,
        };
        // decrement 必须是正数
        this.decrements = {
            [interfaces_1.Side.ASK]: new Map(),
            [interfaces_1.Side.BID]: new Map(),
        };
    }
    getOrderbook() {
        this.apply();
        return this.orderbook;
    }
    setBasebook(newBasebook) {
        assert(newBasebook.time === this.core.timeline.now());
        this.basebook = newBasebook;
        this.time = newBasebook.time;
        this.applied = false;
    }
    decQuantity(side, price, decrement) {
        assert(decrement.gt(0));
        const priceString = price.toFixed(this.core.config.PRICE_DP);
        const old = this.decrements[side].get(priceString) || new big_js_1.default(0);
        this.decrements[side].set(priceString, old.plus(decrement));
        this.time = this.core.timeline.now();
        this.applied = false;
    }
    apply() {
        if (this.applied)
            return;
        const total = {
            [interfaces_1.Side.ASK]: new Map(),
            [interfaces_1.Side.BID]: new Map(),
        };
        for (const side of [interfaces_1.Side.BID, interfaces_1.Side.ASK]) {
            for (const order of this.basebook[side])
                total[side].set(order.price.toFixed(this.core.config.PRICE_DP), order.quantity);
            for (const [priceString, decrement] of this.decrements[side]) {
                let quantity = total[side].get(priceString);
                if (quantity) {
                    quantity = quantity.minus(decrement);
                    if (quantity.lte(0))
                        total[side].delete(priceString);
                    else
                        total[side].set(priceString, quantity);
                }
                else
                    this.decrements[side].delete(priceString);
            }
            // 文档说 Map 的迭代顺序等于插入顺序，所以不用排序
            this.orderbook[side] = [...total[side]]
                .map(([priceString, quantity]) => ({
                price: new big_js_1.default(priceString),
                quantity,
                side,
            }));
        }
        this.applied = true;
    }
    capture() {
        return {
            basebook: {
                [interfaces_1.Side.ASK]: this.basebook[interfaces_1.Side.ASK].map(order => ({
                    price: order.price,
                    quantity: order.quantity,
                    side: order.side,
                })),
                [interfaces_1.Side.BID]: this.basebook[interfaces_1.Side.BID].map(order => ({
                    price: order.price,
                    quantity: order.quantity,
                    side: order.side,
                })),
                time: this.basebook.time,
            },
            decrements: {
                [interfaces_1.Side.ASK]: [...this.decrements[interfaces_1.Side.ASK]],
                [interfaces_1.Side.BID]: [...this.decrements[interfaces_1.Side.BID]],
            },
            time: this.time,
        };
    }
    restore(snapshot) {
        this.basebook = {
            time: snapshot.basebook.time === null
                ? Number.NEGATIVE_INFINITY
                : snapshot.basebook.time
        };
        this.decrements = {};
        for (const side of [interfaces_1.Side.ASK, interfaces_1.Side.BID]) {
            this.basebook[side] = snapshot.basebook[side].map(order => ({
                price: new big_js_1.default(order.price),
                quantity: new big_js_1.default(order.quantity),
                side: order.side,
            }));
            this.decrements[side] = new Map(snapshot.decrements[side].map(([priceString, decrement]) => [priceString, new big_js_1.default(decrement)]));
        }
        this.time = snapshot.time === null
            ? Number.NEGATIVE_INFINITY
            : snapshot.time;
        this.applied = false;
    }
}
exports.StateOrderbook = StateOrderbook;
//# sourceMappingURL=orderbook.js.map
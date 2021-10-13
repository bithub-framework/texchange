"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateOrderbook = void 0;
const interfaces_1 = require("../interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
class StateOrderbook {
    constructor(core, snapshot) {
        this.core = core;
        this.time = Number.NEGATIVE_INFINITY;
        this.orderbook = {
            [interfaces_1.Side.ASK]: [],
            [interfaces_1.Side.BID]: [],
            time: Number.NEGATIVE_INFINITY,
        };
        this.applied = true;
        this.baseBook = {
            [interfaces_1.Side.ASK]: [],
            [interfaces_1.Side.BID]: [],
            time: Number.NEGATIVE_INFINITY,
        };
        // decrement 必须是正数
        this.decrements = {
            [interfaces_1.Side.ASK]: new Map(),
            [interfaces_1.Side.BID]: new Map(),
        };
        if (snapshot) {
            this.baseBook = {
                [interfaces_1.Side.ASK]: snapshot.baseBook[interfaces_1.Side.ASK].map(order => ({
                    price: new big_js_1.default(order.price),
                    quantity: new big_js_1.default(order.quantity),
                    side: order.side,
                })),
                [interfaces_1.Side.BID]: snapshot.baseBook[interfaces_1.Side.BID].map(order => ({
                    price: new big_js_1.default(order.price),
                    quantity: new big_js_1.default(order.quantity),
                    side: order.side,
                })),
                time: snapshot.baseBook.time,
            };
            this.decrements = {
                [interfaces_1.Side.ASK]: new Map(snapshot.decrements[interfaces_1.Side.ASK].map(([priceString, decrement]) => [priceString, new big_js_1.default(decrement)])),
                [interfaces_1.Side.BID]: new Map(snapshot.decrements[interfaces_1.Side.BID].map(([priceString, decrement]) => [priceString, new big_js_1.default(decrement)])),
            };
            this.time = snapshot.time;
            this.applied = false;
            this.apply();
        }
    }
    getBook() {
        this.apply();
        return this.orderbook;
    }
    setBase(newBaseBook) {
        this.baseBook = newBaseBook;
        this.time = this.core.timeline.now();
        this.applied = false;
    }
    decQuantity(side, price, decrement) {
        assert(decrement.gt(0));
        const priceString = price.toFixed(this.core.config.PRICE_DP);
        const origin = this.decrements[side].get(priceString) || new big_js_1.default(0);
        this.decrements[side].set(priceString, origin.plus(decrement));
        this.time = this.core.timeline.now();
        this.applied = false;
    }
    apply() {
        if (this.applied)
            return;
        for (const side of [interfaces_1.Side.BID, interfaces_1.Side.ASK]) {
            const total = {
                [interfaces_1.Side.ASK]: new Map(),
                [interfaces_1.Side.BID]: new Map(),
            };
            for (const order of this.baseBook[side])
                total[side].set(order.price.toFixed(this.core.config.PRICE_DP), order.quantity);
            for (const [priceString, decrement] of this.decrements[side]) {
                const quantity = total[side].get(priceString);
                if (quantity) {
                    const newQuantity = quantity.minus(decrement);
                    if (newQuantity.lte(0))
                        total[side].delete(priceString);
                    else
                        total[side].set(priceString, newQuantity);
                }
                else
                    this.decrements[side].delete(priceString);
            }
            // 文档说 Map 的迭代顺序等于插入顺序，所以不用排序
            this.orderbook[side] = [...total[side]]
                .map(([priceString, quantity]) => ({
                price: new big_js_1.default(priceString), quantity, side,
            }));
        }
        this.applied = true;
    }
    capture() {
        return {
            baseBook: this.baseBook,
            decrements: {
                [interfaces_1.Side.ASK]: [...this.decrements[interfaces_1.Side.ASK]],
                [interfaces_1.Side.BID]: [...this.decrements[interfaces_1.Side.BID]],
            },
            time: this.time,
        };
    }
}
exports.StateOrderbook = StateOrderbook;
//# sourceMappingURL=orderbook.js.map
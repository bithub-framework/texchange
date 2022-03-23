"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecrementsStatic = exports.Book = void 0;
const interfaces_1 = require("interfaces");
const assert = require("assert");
class Book {
    constructor(context) {
        this.context = context;
        this.time = Number.NEGATIVE_INFINITY;
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
        this.finalbookCache = null;
        this.Orderbook = new interfaces_1.OrderbookStatic(this.context.H);
        this.Decrements = new DecrementsStatic(this.context.H);
    }
    setBasebook(newBasebook) {
        assert(newBasebook.time === this.context.timeline.now());
        this.basebook = newBasebook;
        this.time = newBasebook.time;
        this.finalbookCache = null;
    }
    decQuantity(side, price, decrement) {
        assert(decrement.gt(0));
        const priceString = price.toFixed(this.context.config.market.PRICE_DP);
        const oldTotalDecrement = this.decrements[side].get(priceString)
            || this.context.H.from(0);
        const newTotalDecrement = oldTotalDecrement.plus(decrement);
        this.decrements[side].set(priceString, newTotalDecrement);
        this.time = this.context.timeline.now();
        this.finalbookCache = null;
    }
    apply() {
        if (this.finalbookCache)
            return this.finalbookCache;
        const total = {
            [interfaces_1.Side.ASK]: new Map(),
            [interfaces_1.Side.BID]: new Map(),
        };
        this.finalbookCache = { time: this.time };
        for (const side of [interfaces_1.Side.BID, interfaces_1.Side.ASK]) {
            for (const order of this.basebook[side])
                total[side].set(order.price.toFixed(this.context.config.market.PRICE_DP), order.quantity);
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
            this.finalbookCache[side] = [...total[side]]
                .map(([priceString, quantity]) => ({
                price: this.context.H.from(priceString),
                quantity,
                side,
            }));
        }
        return this.finalbookCache;
    }
    getBook() {
        return this.apply();
    }
    capture() {
        return {
            basebook: this.Orderbook.capture(this.basebook),
            decrements: this.Decrements.capture(this.decrements),
            time: Number.isFinite(this.time)
                ? this.time
                : null,
        };
    }
    restore(snapshot) {
        this.basebook = this.Orderbook.restore(snapshot.basebook);
        this.decrements = this.Decrements.restore(snapshot.decrements);
        this.time = snapshot.time === null
            ? Number.NEGATIVE_INFINITY
            : snapshot.time;
        this.finalbookCache = null;
    }
}
exports.Book = Book;
class DecrementsStatic {
    constructor(H) {
        this.H = H;
    }
    capture(decrements) {
        return {
            [interfaces_1.Side.ASK]: [...decrements[interfaces_1.Side.ASK]].map(([priceString, decrement]) => [priceString, this.H.capture(decrement)]),
            [interfaces_1.Side.BID]: [...decrements[interfaces_1.Side.BID]].map(([priceString, decrement]) => [priceString, this.H.capture(decrement)]),
        };
    }
    restore(snapshot) {
        const decrements = {};
        for (const side of [interfaces_1.Side.ASK, interfaces_1.Side.BID]) {
            decrements[side] = new Map(snapshot[side].map(([priceString, decrement]) => [priceString, this.H.restore(decrement)]));
        }
        return decrements;
    }
}
exports.DecrementsStatic = DecrementsStatic;
//# sourceMappingURL=book.js.map
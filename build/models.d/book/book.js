"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const interfaces_1 = require("interfaces");
const assert = require("assert");
const decrements_1 = require("./decrements");
class Book {
    constructor(context) {
        this.context = context;
        this.Orderbook = new interfaces_1.OrderbookStatic(this.context.H);
        this.Decrements = new decrements_1.DecrementsStatic(this.context.H);
        this.time = Number.NEGATIVE_INFINITY;
        this.basebook = {
            [interfaces_1.Side.ASK]: [],
            [interfaces_1.Side.BID]: [],
            time: Number.NEGATIVE_INFINITY,
        };
        this.decrements = {
            [interfaces_1.Side.ASK]: new Map(),
            [interfaces_1.Side.BID]: new Map(),
        };
        this.finalbookCache = null;
    }
    setBasebook(basebook) {
        assert(basebook.time === this.context.timeline.now());
        this.basebook = basebook;
        this.time = basebook.time;
        this.tryApply();
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
    tryApply() {
        if (this.finalbookCache)
            return this.finalbookCache;
        const $final = { time: this.time };
        const total = {
            [interfaces_1.Side.ASK]: new Map(),
            [interfaces_1.Side.BID]: new Map(),
        };
        for (const side of [interfaces_1.Side.BID, interfaces_1.Side.ASK]) {
            for (const order of this.basebook[side])
                total[side].set(order.price.toFixed(this.context.config.market.PRICE_DP), order.quantity);
            for (const [priceString, decrement] of this.decrements[side]) {
                let quantity = total[side].get(priceString);
                if (typeof quantity !== 'undefined') {
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
            $final[side] = [...total[side]]
                .map(([priceString, quantity]) => ({
                price: this.context.H.from(priceString),
                quantity,
                side,
            }));
        }
        return this.finalbookCache = $final;
    }
    getBook() {
        return this.tryApply();
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
//# sourceMappingURL=book.js.map
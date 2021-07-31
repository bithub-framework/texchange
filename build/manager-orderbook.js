"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderbookManager = exports.default = void 0;
const interfaces_1 = require("./interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
class OrderbookManager {
    constructor(config, now) {
        this.config = config;
        this.now = now;
        this.orderbook = {
            [interfaces_1.Side.ASK]: [],
            [interfaces_1.Side.BID]: [],
            time: Number.NEGATIVE_INFINITY,
        };
        this.applied = false;
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
        this.apply();
    }
    getBook() {
        assert(this.applied);
        return this.orderbook;
    }
    setBase(newBaseBook) {
        this.baseBook = newBaseBook;
        this.orderbook.time = this.now();
        this.applied = false;
    }
    decQuantity(side, price, decrement) {
        assert(decrement.gt(0));
        const priceString = price.toFixed(this.config.PRICE_DP);
        const origin = this.decrements[side].get(priceString) || new big_js_1.default(0);
        this.decrements[side].set(priceString, origin.plus(decrement));
        this.orderbook.time = this.now();
        this.applied = false;
    }
    apply() {
        for (const side of [interfaces_1.Side.BID, interfaces_1.Side.ASK]) {
            const total = {
                [interfaces_1.Side.ASK]: new Map(),
                [interfaces_1.Side.BID]: new Map(),
            };
            for (const order of this.baseBook[side])
                total[side].set(order.price.toFixed(this.config.PRICE_DP), order.quantity);
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
}
exports.default = OrderbookManager;
exports.OrderbookManager = OrderbookManager;
//# sourceMappingURL=manager-orderbook.js.map
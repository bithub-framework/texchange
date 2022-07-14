"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const secretary_like_1 = require("secretary-like");
const assert = require("assert");
const decrements_1 = require("./decrements");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/types");
let Book = class Book {
    constructor(context, marketSpec) {
        this.context = context;
        this.marketSpec = marketSpec;
        this.Decrements = new decrements_1.DecrementsStatic(this.context.Data.H);
        this.time = Number.NEGATIVE_INFINITY;
        this.basebook = {
            [secretary_like_1.Side.ASK]: [],
            [secretary_like_1.Side.BID]: [],
            time: Number.NEGATIVE_INFINITY,
        };
        this.decrements = {
            [secretary_like_1.Side.ASK]: new Map(),
            [secretary_like_1.Side.BID]: new Map(),
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
        const priceString = price.toFixed(this.marketSpec.PRICE_DP);
        const oldTotalDecrement = this.decrements[side].get(priceString)
            || new this.context.Data.H(0);
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
            [secretary_like_1.Side.ASK]: new Map(),
            [secretary_like_1.Side.BID]: new Map(),
        };
        for (const side of [secretary_like_1.Side.BID, secretary_like_1.Side.ASK]) {
            for (const order of this.basebook[side])
                total[side].set(order.price.toFixed(this.marketSpec.PRICE_DP), order.quantity);
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
                price: new this.context.Data.H(priceString),
                quantity,
                side,
            }));
        }
        return this.finalbookCache = $final;
    }
    getOrderbook() {
        return this.tryApply();
    }
    lineUp(order) {
        const makers = this.getOrderbook()[order.side];
        let behind = new this.context.Data.H(0);
        for (const maker of makers)
            if (maker.price.eq(order.price))
                behind = behind.plus(maker.quantity);
        return behind;
    }
    capture() {
        return {
            basebook: this.context.Data.Orderbook.capture(this.basebook),
            decrements: this.Decrements.capture(this.decrements),
            time: Number.isFinite(this.time)
                ? this.time
                : null,
        };
    }
    restore(snapshot) {
        this.basebook = this.context.Data.Orderbook.restore(snapshot.basebook);
        this.decrements = this.Decrements.restore(snapshot.decrements);
        this.time = snapshot.time === null
            ? Number.NEGATIVE_INFINITY
            : snapshot.time;
        this.finalbookCache = null;
    }
};
Book = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec))
], Book);
exports.Book = Book;
//# sourceMappingURL=book.js.map
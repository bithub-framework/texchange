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
        this.Decrements = new decrements_1.DecrementsFactory(this.context.dataTypes.hFactory);
        this.time = Number.NEGATIVE_INFINITY;
        this.basebook = new secretary_like_1.Orderbook([], [], Number.NEGATIVE_INFINITY);
        this.decrements = new decrements_1.Decrements(new Map(), new Map());
        this.finalbookCache = null;
    }
    setBasebook(basebook) {
        assert(basebook.time === this.context.timeline.now());
        this.basebook = basebook;
        this.time = basebook.time;
        this.finalbookCache = null;
    }
    decQuantity(side, price, decrement) {
        assert(decrement.gt(0));
        const priceString = price.toFixed(this.marketSpec.PRICE_DP);
        const oldTotalDecrement = this.decrements.get(side).get(priceString)
            || this.context.dataTypes.hFactory.from(0);
        const newTotalDecrement = oldTotalDecrement.plus(decrement);
        this.decrements.get(side).set(priceString, newTotalDecrement);
        this.time = this.context.timeline.now();
        this.finalbookCache = null;
    }
    tryApply() {
        if (this.finalbookCache)
            return this.finalbookCache;
        const $final = new secretary_like_1.Orderbook([], [], this.time);
        const $total = new decrements_1.Decrements(new Map(), new Map());
        for (const side of [secretary_like_1.Side.BID, secretary_like_1.Side.ASK]) {
            for (const order of this.basebook.get(side))
                $total.get(side).set(order.price.toFixed(this.marketSpec.PRICE_DP), order.quantity);
            for (const [priceString, decrement] of this.decrements.get(side)) {
                let quantity = $total.get(side).get(priceString);
                if (typeof quantity !== 'undefined') {
                    quantity = quantity.minus(decrement);
                    if (quantity.lte(0))
                        $total.get(side).delete(priceString);
                    else
                        $total.get(side).set(priceString, quantity);
                }
                else
                    this.decrements.get(side).delete(priceString);
            }
            // 文档说 Map 的迭代顺序等于插入顺序，所以不用排序
            $final.set(side, [...$total.get(side)].map(([priceString, quantity]) => ({
                price: this.context.dataTypes.hFactory.from(priceString),
                quantity,
                side,
            })));
        }
        return this.finalbookCache = $final;
    }
    getOrderbook() {
        return this.tryApply();
    }
    lineUp(order) {
        const makers = this.getOrderbook().get(order.side);
        let behind = this.context.dataTypes.hFactory.from(0);
        for (const maker of makers)
            if (maker.price.eq(order.price))
                behind = behind.plus(maker.quantity);
        return behind;
    }
    capture() {
        return {
            basebook: this.context.dataTypes.orderbookFactory.capture(this.basebook),
            decrements: this.Decrements.capture(this.decrements),
            time: Number.isFinite(this.time)
                ? this.time
                : null,
        };
    }
    restore(snapshot) {
        this.basebook = this.context.dataTypes.orderbookFactory.restore(snapshot.basebook);
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
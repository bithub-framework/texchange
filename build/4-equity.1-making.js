"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const _3_taken_1 = require("./3-taken");
const interfaces_1 = require("./interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
const min_1 = require("./min");
class Texchange extends _3_taken_1.Texchange {
    /** @override */
    validateOrder(order) {
        this.formatCorrect(order);
        this.enoughPosition(order);
        // TODO 支持 one way
        if (this.config.ONE_WAY_POSITION)
            this.singleLength(order);
    }
    enoughPosition(order) {
        if (order.operation === interfaces_1.Operation.CLOSE)
            assert(order.unfilled.lte(this.equity.position[order.length]));
    }
    singleLength(order) {
        assert(this.equity.position[-order.length].eq(0));
    }
    /** @override */
    makeOpenOrder(order) {
        const uTrades = this.orderTakes(order);
        this.orderMakes(order);
        if (uTrades.length) {
            this.pushUTrades(uTrades);
            this.pushOrderbook();
        }
        return order;
    }
    /** @override */
    orderTakes(taker) {
        const uTrades = [];
        let volume = new big_js_1.default(0);
        let dollarVolume = new big_js_1.default(0);
        const orderbook = this.book.getBook();
        for (const maker of orderbook[-taker.side])
            if ((taker.side === interfaces_1.Side.BID && taker.price.gte(maker.price) ||
                taker.side === interfaces_1.Side.ASK && taker.price.lte(maker.price)) && taker.unfilled.gt(0)) {
                const quantity = min_1.min(taker.unfilled, maker.quantity);
                uTrades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: this.now(),
                });
                this.book.decQuantity(maker.side, maker.price, quantity);
                taker.filled = taker.filled.plus(quantity);
                taker.unfilled = taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(this.config.calcDollarVolume(maker.price, quantity))
                    .round(this.config.CURRENCY_DP);
            }
        this.book.apply();
        const takerFee = dollarVolume.times(this.config.TAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
        if (taker.operation === interfaces_1.Operation.OPEN) {
            this.equity.openPosition(taker.length, volume, dollarVolume, takerFee);
        }
        else {
            this.equity.closePosition(taker.length, volume, dollarVolume, takerFee);
        }
        return uTrades;
    }
    /** @override */
    orderMakes(openOrder) {
        const openMaker = {
            price: openOrder.price,
            quantity: openOrder.quantity,
            side: openOrder.side,
            length: openOrder.length,
            operation: openOrder.operation,
            filled: openOrder.filled,
            unfilled: openOrder.unfilled,
            id: openOrder.id,
            behind: new big_js_1.default(0),
        };
        const orderbook = this.book.getBook();
        for (const maker of orderbook[openOrder.side])
            if (maker.price.eq(openOrder.price))
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        this.makers.addOrder(openMaker);
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=4-equity.1-making.js.map
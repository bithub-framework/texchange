"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = void 0;
const _4_equity_3_others_1 = require("./4-equity.3-others");
const interfaces_1 = require("./interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
const min_1 = require("./min");
class Core extends _4_equity_3_others_1.Core {
    /** @override */
    validateOrder(order) {
        this.formatCorrect(order);
        this.assertEnoughPosition(order);
        this.assertEnoughAvailable(order);
    }
    /** @override */
    assertEnoughPosition(order) {
        if (order.operation === interfaces_1.Operation.CLOSE)
            assert(order.unfilled.lte(new big_js_1.default(0)
                .plus(this.equity.position[order.length])
                .minus(this.margin.frozenPosition[order.length])));
    }
    assertEnoughAvailable(order) {
        if (order.operation === interfaces_1.Operation.OPEN)
            assert(new big_js_1.default(0)
                .plus(this.config.calcFreezingMargin({
                spec: this.config,
                markPrice: this.markPrice,
                latestPrice: this.latestPrice,
                time: this.now(),
                order,
            })).plus(this.config.calcDollarVolume(order.price, order.unfilled).times(this.config.TAKER_FEE_RATE)).round(this.config.CURRENCY_DP)
                .lte(this.margin.available));
    }
    /** @override */
    makeOpenOrder(order) {
        const uTrades = this.orderTakes(order);
        this.orderMakes(order);
        if (uTrades.length) {
            this.pushUTrades(uTrades);
            this.pushOrderbook();
            this.pushPositionsAndBalances();
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
            this.margin.incPositionMargin(taker.length, this.config.calcPositionMarginIncrement({
                spec: this.config,
                markPrice: this.markPrice,
                latestPrice: this.latestPrice,
                time: this.now(),
                volume,
                dollarVolume,
                order: taker,
            }).round(this.config.CURRENCY_DP));
            this.equity.openPosition(taker.length, volume, dollarVolume, takerFee);
        }
        else {
            this.margin.decPositionMargin(taker.length, this.config.calcPositionMarginDecrement({
                spec: this.config,
                latestPrice: this.latestPrice,
                markPrice: this.markPrice,
                time: this.now(),
                volume,
                dollarVolume,
                position: this.equity.position,
                cost: this.equity.cost,
                balance: this.equity.balance,
                positionMargin: this.margin.positionMargin,
                frozenBalance: this.margin.frozenBalance,
                frozenPosition: this.margin.frozenPosition,
            }).round(this.config.CURRENCY_DP));
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
        const toFreeze = this.makers.addOrder(openMaker);
        this.margin.freeze(toFreeze);
    }
}
exports.Core = Core;
//# sourceMappingURL=5-margin.1-making.js.map
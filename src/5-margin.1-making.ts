import {
    Texchange as Parent,
    Events,
} from './4-equity.3-others';
import {
    UnidentifiedTrade,
    Operation,
    OpenOrder,
    OpenMaker,
    Side,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';
import { MarginManager } from './state-managers/margin-manager/main';
import assert = require('assert');
import { min } from './min';


abstract class Texchange extends Parent {
    protected abstract pushPositionsAndBalances(): void;
    protected abstract margin: MarginManager;


    /** @override */
    protected validateOrder(order: OpenOrder) {
        this.formatCorrect(order);
        this.assertEnoughPosition(order);
        if (this.config.ONE_WAY_POSITION) this.singleLength(order);
        // 暂只支持实时结算
        this.clear();
        this.assertEnoughAvailable(order);
    }

    /** @override */
    protected assertEnoughPosition(order: OpenOrder) {
        if (order.operation === Operation.CLOSE)
            assert(
                order.unfilled.lte(new Big(0)
                    .plus(this.equity.position[order.length])
                    .minus(this.margin.frozenPosition[order.length])
                ),
            );
    }

    private assertEnoughAvailable(order: OpenOrder) {
        if (order.operation === Operation.OPEN)
            assert(new Big(0)
                .plus(this.config.calcInitialMargin({
                    spec: this.config,
                    order,
                    clearingPrice: this.clearingPrice,
                    latestPrice: this.latestPrice,
                })).plus(
                    this.config.calcDollarVolume(
                        order.price, order.unfilled,
                    ).times(this.config.TAKER_FEE_RATE),
                ).round(this.config.CURRENCY_DP)
                .lte(this.margin.available),
            );
    }

    /** @override */
    protected makeOpenOrder(order: OpenOrder): OpenOrder {
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
    protected orderTakes(taker: OpenOrder): UnidentifiedTrade[] {
        const uTrades: UnidentifiedTrade[] = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        const orderbook = this.book.getBook();
        for (const maker of orderbook[-taker.side])
            if (
                (
                    taker.side === Side.BID && taker.price.gte(maker.price) ||
                    taker.side === Side.ASK && taker.price.lte(maker.price)
                ) && taker.unfilled.gt(0)
            ) {
                const quantity = min(taker.unfilled, maker.quantity);
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
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (taker.operation === Operation.OPEN) {
            this.margin.incPositionMargin(this.config.calcPositionMarginIncrement({
                spec: this.config,
                orderPrice: taker.price,
                volume,
                dollarVolume,
                clearingPrice: this.clearingPrice,
                latestPrice: this.latestPrice,
            }).round(this.config.CURRENCY_DP));
            this.equity.openPosition(
                taker.length, volume, dollarVolume, takerFee,
            );
        } else {
            this.margin.decPositionMargin(this.config.calcPositionMarginDecrement({
                spec: this.config,
                position: this.equity.position,
                cost: this.equity.cost,
                volume,
                marginSum: this.margin.positionMargin,
            }).round(this.config.CURRENCY_DP));
            this.equity.closePosition(
                taker.length, volume, dollarVolume, takerFee,
            );
        }
        return uTrades;
    }

    /** @override */
    protected orderMakes(
        openOrder: OpenOrder,
    ): void {
        const openMaker: OpenMaker = {
            price: openOrder.price,
            quantity: openOrder.quantity,
            side: openOrder.side,
            length: openOrder.length,
            operation: openOrder.operation,
            filled: openOrder.filled,
            unfilled: openOrder.unfilled,
            id: openOrder.id,
            behind: new Big(0),
        };
        const orderbook = this.book.getBook();
        for (const maker of orderbook[openOrder.side])
            if (maker.price.eq(openOrder.price))
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        const toFreeze = this.makers.addOrder(openMaker);
        this.margin.freeze(toFreeze);
    }
}

export {
    Texchange,
    Events,
}

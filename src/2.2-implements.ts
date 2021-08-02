import {
    OpenOrder,
    Side, Operation, Length,
    UnidentifiedTrade,
    min,
    OpenMaker,
} from './interfaces';
import Big from 'big.js';
import assert = require('assert');
import {
    Texchange as Parent,
    Events,
} from './2.1-interfaces';

abstract class Texchange extends Parent {
    protected makeOpenOrder(order: OpenOrder): OpenOrder {
        const uTrades = this.orderTakes(order);
        this.orderMakes(order);
        if (uTrades.length) {
            this.pushUTrades(uTrades);
            this.pushOrderbook();
        }
        return order;
    }

    protected validateOrder(order: OpenOrder) {
        this.formatCorrect(order);
    }

    protected formatCorrect(order: OpenOrder) {
        assert(order.price.eq(order.price.round(this.config.PRICE_DP)));
        assert(order.price.mod(this.config.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.config.QUANTITY_DP)));
        assert(order.length === Length.LONG || order.length === Length.SHORT);
        assert(order.operation === Operation.OPEN || order.operation === Operation.CLOSE);
        assert(order.operation * order.length === order.side);
    }

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
        return uTrades;
    }

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
        this.makers.addOrder(openMaker);
    }

    protected cancelOpenOrder(order: OpenOrder): OpenOrder {
        const filled = this.makers.get(order.id)?.filled || order.quantity;
        this.makers.removeOrder(order.id);
        return {
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: order.id,
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }
}

export {
    Texchange,
    Events,
}

import {
    Texchange as Parent,
    Events,
} from './3-taken';
import {
    LimitOrder,
    UnidentifiedTrade,
    Operation,
    OpenOrder,
    OpenMaker,
    Side,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';
import assert = require('assert');
import { min } from './min';
import { EquityManager } from './state-managers/equity-manager';


abstract class Texchange extends Parent {
    protected abstract equity: EquityManager;
    protected abstract settle(): void;


    /** @override */
    protected validateOrder(order: OpenOrder) {
        this.formatCorrect(order);
        this.enoughPosition(order);
        // TODO 支持 one way
        if (this.config.ONE_WAY_POSITION) this.singleLength(order);
    }

    protected enoughPosition(order: OpenOrder) {
        if (order.operation === Operation.CLOSE)
            assert(
                order.unfilled.lte(this.equity.position[order.length]),
            );
    }

    protected singleLength(order: LimitOrder) {
        assert(this.equity.position[-order.length].eq(0));
    }

    /** @override */
    protected makeOpenOrder(order: OpenOrder): OpenOrder {
        const uTrades = this.orderTakes(order);
        this.orderMakes(order);
        if (uTrades.length) {
            this.pushUTrades(uTrades);
            this.pushOrderbook();
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
            this.equity.openPosition(
                taker.length, volume, dollarVolume, takerFee,
            );
        } else {
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
        this.makers.addOrder(openMaker);
    }
}

export {
    Texchange,
    Events,
}

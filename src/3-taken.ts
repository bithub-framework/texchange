import {
    Texchange as Parent,
    Events,
} from './2-ordering';
import {
    Side,
    UnidentifiedTrade,
    OpenOrder,
    OpenMaker,
} from './interfaces';
import { min } from './min';
import Big from 'big.js';
import assert = require('assert');

abstract class Texchange extends Parent {
    protected uTradeShouldTakeOpenOrder(
        trade: UnidentifiedTrade, maker: OpenOrder,
    ): boolean {
        return (
            maker.side === Side.BID &&
            trade.side === Side.ASK &&
            trade.price.lte(maker.price)
            ||
            maker.side === Side.ASK &&
            trade.side === Side.BID &&
            trade.price.gte(maker.price)
        );
    }

    protected uTradeTakesOrderQueue(
        uTrade: UnidentifiedTrade, maker: OpenMaker,
    ): void {
        if (uTrade.price.eq(maker.price)) {
            const volume = min(uTrade.quantity, maker.behind);
            uTrade.quantity = uTrade.quantity.minus(volume);
            maker.behind = maker.behind.minus(volume);
        } else maker.behind = new Big(0);
    }

    protected uTradeTakesOpenMaker(
        uTrade: UnidentifiedTrade, maker: OpenMaker,
    ): Big {
        const volume = min(uTrade.quantity, maker.unfilled);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        this.makers.takeOrder(maker.id, volume, dollarVolume);
        return volume;
    }

    protected uTradeTakesOpenMakers(uTrade: UnidentifiedTrade) {
        uTrade = {
            price: uTrade.price,
            quantity: uTrade.quantity,
            side: uTrade.side,
            time: uTrade.time,
        };
        let totalVolume = new Big(0);
        for (const order of [...this.makers.values()])
            if (this.uTradeShouldTakeOpenOrder(uTrade, order)) {
                this.uTradeTakesOrderQueue(uTrade, order);
                const volume = this.uTradeTakesOpenMaker(uTrade, order);
                totalVolume = totalVolume.plus(volume);
            }
        return totalVolume;
    }

    /** @override */
    public updateTrades(uTrades: UnidentifiedTrade[]): void {
        for (const uTrade of uTrades)
            assert(uTrade.time === this.now());
        this.pushUTrades(uTrades);
        for (let uTrade of uTrades) {
            this.settlementPrice = new Big(0)
                .plus(this.settlementPrice.times(.9))
                .plus(uTrade.price.times(.1))
                .round(this.config.PRICE_DP);
            this.latestPrice = uTrade.price;
        }

        let totalVolume = new Big(0);
        for (let uTrade of uTrades) {
            const volume = this.uTradeTakesOpenMakers(uTrade);
            totalVolume = totalVolume.plus(volume);
        }
    }
}

export {
    Texchange,
    Events,
}

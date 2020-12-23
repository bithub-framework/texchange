import { Ordering } from './2-ordering';
import {
    BID, ASK,
    RawTrade,
    min,
    DetailedOpenOrder,
} from './interfaces';
import Big from 'big.js';

class Taken extends Ordering {
    protected rawTradeShouldTakeOpenOrder(
        rawTrade: RawTrade, maker: DetailedOpenOrder,
    ): boolean {
        return (
            (
                maker.side === BID &&
                rawTrade.side === ASK &&
                rawTrade.price.lt(maker.price)
            ) || (
                maker.side === ASK &&
                rawTrade.side === BID &&
                rawTrade.price.gt(maker.price)
            )
        );
    }

    protected rawTradeTakesOpenOrder(
        rawTrade: RawTrade,
        maker: DetailedOpenOrder,
    ): [Big, Big] {
        const volume = min(rawTrade.quantity, maker.quantity);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        rawTrade.quantity = rawTrade.quantity.minus(volume);
        maker.quantity = maker.quantity.minus(volume);
        if (maker.quantity.eq(0)) this.openOrders.delete(maker.id);
        return [volume, dollarVolume];
    }

    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade) {
        const rawTrade: RawTrade = { ..._rawTrade };
        for (const order of this.openOrders.values())
            if (this.rawTradeShouldTakeOpenOrder(rawTrade, order))
                this.rawTradeTakesOpenOrder(rawTrade, order);
    }

    public updateTrades(rawTrades: RawTrade[]): void {
        for (let rawTrade of rawTrades)
            this.rawTradeTakesOpenOrders(rawTrade);
        super.updateTrades(rawTrades);
    }
}

export {
    Taken as default,
    Taken,
}

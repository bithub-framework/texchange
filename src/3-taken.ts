import { Ordering } from './2-ordering';
import {
    BID, ASK,
    RawTrade,
    min,
    OpenOrder,
} from './interfaces';

class Taken extends Ordering {
    protected rawTradeShouldTakeOpenOrder(
        rawTrade: RawTrade, maker: OpenOrder,
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
        maker: OpenOrder,
    ): void {
        const volume = min(rawTrade.quantity, maker.quantity);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        rawTrade.quantity = rawTrade.quantity.minus(volume);
        this.openOrderManager.take(maker.id, volume, dollarVolume);
    }

    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade) {
        const rawTrade: RawTrade = { ..._rawTrade };
        for (const order of this.openOrderManager.getOpenOrders().values())
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

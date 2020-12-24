import { Ordering } from './2-ordering';
import {
    BID, ASK,
    RawTrade,
    min,
    OpenOrder,
} from './interfaces';

class Taken extends Ordering {
    protected rawTradeShouldTakeOpenOrder(
        trade: RawTrade, maker: OpenOrder,
    ): boolean {
        return (
            maker.side === BID &&
            trade.side === ASK &&
            trade.price.lt(maker.price)
            ||
            maker.side === ASK &&
            trade.side === BID &&
            trade.price.gt(maker.price)
        );
    }

    protected rawTradeTakesOpenOrder(
        trade: RawTrade, maker: OpenOrder,
    ): void {
        const volume = min(trade.quantity, maker.quantity);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        trade.quantity = trade.quantity.minus(volume);
        this.openOrders.takeOrder(maker.id, volume, dollarVolume);
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

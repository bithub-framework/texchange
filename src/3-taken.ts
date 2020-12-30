import { Ordering } from './2-ordering';
import {
    BID, ASK,
    UnidentifiedTrade,
    min,
    OpenOrder,
} from './interfaces';

class Taken extends Ordering {
    protected noidTradeShouldTakeOpenOrder(
        trade: UnidentifiedTrade, maker: OpenOrder,
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

    protected noidTradeTakesOpenOrder(
        trade: UnidentifiedTrade, maker: OpenOrder,
    ): void {
        const volume = min(trade.quantity, maker.quantity);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        trade.quantity = trade.quantity.minus(volume);
        this.openOrders.takeOrder(maker.id, volume, dollarVolume);
    }

    protected noidTradeTakesOpenOrders(_noidTrade: UnidentifiedTrade) {
        const noidTrade: UnidentifiedTrade = { ..._noidTrade };
        for (const order of this.openOrders.values())
            if (this.noidTradeShouldTakeOpenOrder(noidTrade, order))
                this.noidTradeTakesOpenOrder(noidTrade, order);
    }

    public updateTrades(noidTrades: UnidentifiedTrade[]): void {
        for (let noidTrade of noidTrades)
            this.noidTradeTakesOpenOrders(noidTrade);
        super.updateTrades(noidTrades);
    }
}

export {
    Taken as default,
    Taken,
}

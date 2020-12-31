import { Ordering } from './2-ordering';
import {
    BID, ASK,
    UnidentifiedTrade,
    min,
    OpenOrder,
} from './interfaces';

class Taken extends Ordering {
    protected uTradeShouldTakeOpenOrder(
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

    protected uTradeTakesOpenOrder(
        trade: UnidentifiedTrade, maker: OpenOrder,
    ): void {
        const volume = min(trade.quantity, maker.quantity);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        trade.quantity = trade.quantity.minus(volume);
        this.openOrders.takeOrder(maker.id, volume, dollarVolume);
    }

    protected uTradeTakesOpenOrders(_uTrade: UnidentifiedTrade) {
        const uTrade: UnidentifiedTrade = { ..._uTrade };
        for (const order of this.openOrders.values())
            if (this.uTradeShouldTakeOpenOrder(uTrade, order))
                this.uTradeTakesOpenOrder(uTrade, order);
    }

    public updateTrades(uTrades: UnidentifiedTrade[]): void {
        for (let uTrade of uTrades)
            this.uTradeTakesOpenOrders(uTrade);
        super.updateTrades(uTrades);
    }
}

export {
    Taken as default,
    Taken,
}

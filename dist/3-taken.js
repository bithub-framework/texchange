import { Ordering } from './2-ordering';
import { BID, ASK, min, } from './interfaces';
class Taken extends Ordering {
    uTradeShouldTakeOpenOrder(trade, maker) {
        return (maker.side === BID &&
            trade.side === ASK &&
            trade.price.lt(maker.price)
            ||
                maker.side === ASK &&
                    trade.side === BID &&
                    trade.price.gt(maker.price));
    }
    uTradeTakesOpenOrder(trade, maker) {
        const volume = min(trade.quantity, maker.quantity);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        trade.quantity = trade.quantity.minus(volume);
        this.openOrders.takeOrder(maker.id, volume, dollarVolume);
    }
    uTradeTakesOpenOrders(_uTrade) {
        const uTrade = { ..._uTrade };
        for (const order of this.openOrders.values())
            if (this.uTradeShouldTakeOpenOrder(uTrade, order))
                this.uTradeTakesOpenOrder(uTrade, order);
    }
    updateTrades(uTrades) {
        super.updateTrades(uTrades);
        for (let uTrade of uTrades)
            this.uTradeTakesOpenOrders(uTrade);
    }
}
export { Taken as default, Taken, };
//# sourceMappingURL=3-taken.js.map
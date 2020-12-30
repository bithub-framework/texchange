import { Ordering } from './2-ordering';
import { BID, ASK, min, } from './interfaces';
class Taken extends Ordering {
    noidTradeShouldTakeOpenOrder(trade, maker) {
        return (maker.side === BID &&
            trade.side === ASK &&
            trade.price.lt(maker.price)
            ||
                maker.side === ASK &&
                    trade.side === BID &&
                    trade.price.gt(maker.price));
    }
    noidTradeTakesOpenOrder(trade, maker) {
        const volume = min(trade.quantity, maker.quantity);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        trade.quantity = trade.quantity.minus(volume);
        this.openOrders.takeOrder(maker.id, volume, dollarVolume);
    }
    noidTradeTakesOpenOrders(_noidTrade) {
        const noidTrade = { ..._noidTrade };
        for (const order of this.openOrders.values())
            if (this.noidTradeShouldTakeOpenOrder(noidTrade, order))
                this.noidTradeTakesOpenOrder(noidTrade, order);
    }
    updateTrades(noidTrades) {
        for (let noidTrade of noidTrades)
            this.noidTradeTakesOpenOrders(noidTrade);
        super.updateTrades(noidTrades);
    }
}
export { Taken as default, Taken, };
//# sourceMappingURL=3-taken.js.map
import { Ordering } from './2-ordering';
import { BID, ASK, min, } from './interfaces';
class Taken extends Ordering {
    rawTradeShouldTakeOpenOrder(rawTrade, maker) {
        return ((maker.side === BID &&
            rawTrade.side === ASK &&
            rawTrade.price.lt(maker.price)) || (maker.side === ASK &&
            rawTrade.side === BID &&
            rawTrade.price.gt(maker.price)));
    }
    rawTradeTakesOpenOrder(rawTrade, maker) {
        const volume = min(rawTrade.quantity, maker.quantity);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        rawTrade.quantity = rawTrade.quantity.minus(volume);
        this.openOrders.takeOrder(maker.id, volume, dollarVolume);
    }
    rawTradeTakesOpenOrders(_rawTrade) {
        const rawTrade = { ..._rawTrade };
        for (const order of this.openOrders.values())
            if (this.rawTradeShouldTakeOpenOrder(rawTrade, order))
                this.rawTradeTakesOpenOrder(rawTrade, order);
    }
    updateTrades(rawTrades) {
        for (let rawTrade of rawTrades)
            this.rawTradeTakesOpenOrders(rawTrade);
        super.updateTrades(rawTrades);
    }
}
export { Taken as default, Taken, };
//# sourceMappingURL=3-taken.js.map
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
    uTradeTakesOpenOrder(uTrade, maker) {
        const volume = min(uTrade.quantity, maker.quantity);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        const toThaw = this.openOrders.takeOrder(maker.id, volume, dollarVolume);
        return [volume, dollarVolume, toThaw];
    }
    uTradeTakesOpenOrders(uTrade) {
        uTrade = { ...uTrade };
        let totalVolume = new Big(0);
        for (const order of this.openOrders.values())
            if (this.uTradeShouldTakeOpenOrder(uTrade, order)) {
                const [volume] = this.uTradeTakesOpenOrder(uTrade, order);
                totalVolume = totalVolume.plus(volume);
            }
        return totalVolume;
    }
    updateTrades(uTrades) {
        super.updateTrades(uTrades);
        let totalVolume = new Big(0);
        for (let uTrade of uTrades) {
            const volume = this.uTradeTakesOpenOrders(uTrade);
            totalVolume = totalVolume.plus(volume);
        }
        return totalVolume;
    }
}
export { Taken as default, Taken, };
//# sourceMappingURL=3-taken.js.map
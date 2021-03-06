import { Ordering } from './2-ordering';
import { BID, ASK, min, } from './interfaces';
import Big from 'big.js';
class Taken extends Ordering {
    uTradeShouldTakeOpenOrder(trade, maker) {
        return (maker.side === BID &&
            trade.side === ASK &&
            trade.price.lte(maker.price)
            ||
                maker.side === ASK &&
                    trade.side === BID &&
                    trade.price.gte(maker.price));
    }
    uTradeTakesOrderQueue(uTrade, maker) {
        const volume = min(uTrade.quantity, maker.behind);
        uTrade.quantity = uTrade.quantity.minus(volume);
        maker.behind = maker.behind.minus(volume);
    }
    uTradeTakesOpenMaker(uTrade, maker) {
        if (maker.behind.gt(0))
            return [
                new Big(0),
                new Big(0),
                {
                    margin: new Big(0),
                    position: new Big(0),
                    length: 1,
                },
            ];
        const volume = min(uTrade.quantity, maker.quantity);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        const toThaw = this.openOrders.takeOrder(maker.id, volume, dollarVolume);
        return [volume, dollarVolume, toThaw];
    }
    uTradeTakesOpenMakers(uTrade) {
        uTrade = { ...uTrade };
        let totalVolume = new Big(0);
        for (const order of this.openOrders.values())
            if (this.uTradeShouldTakeOpenOrder(uTrade, order)) {
                const [volume] = this.uTradeTakesOpenMaker(uTrade, order);
                totalVolume = totalVolume.plus(volume);
            }
        return totalVolume;
    }
    updateTrades(uTrades) {
        super.updateTrades(uTrades);
        let totalVolume = new Big(0);
        for (let uTrade of uTrades) {
            const volume = this.uTradeTakesOpenMakers(uTrade);
            totalVolume = totalVolume.plus(volume);
        }
        return totalVolume;
    }
}
export { Taken as default, Taken, };
//# sourceMappingURL=3-taken.js.map
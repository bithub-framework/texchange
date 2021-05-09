import { Texchange as Parent, } from './2-ordering';
import { Side, min, } from './interfaces';
import Big from 'big.js';
class Texchange extends Parent {
    uTradeShouldTakeOpenOrder(trade, maker) {
        return (maker.side === Side.BID &&
            trade.side === Side.ASK &&
            trade.price.lte(maker.price)
            ||
                maker.side === Side.ASK &&
                    trade.side === Side.BID &&
                    trade.price.gte(maker.price));
    }
    uTradeTakesOrderQueue(uTrade, maker) {
        if (uTrade.price.eq(maker.price)) {
            const volume = min(uTrade.quantity, maker.behind);
            uTrade.quantity = uTrade.quantity.minus(volume);
            maker.behind = maker.behind.minus(volume);
        }
        else
            maker.behind = new Big(0);
    }
    uTradeTakesOpenMaker(uTrade, maker) {
        const volume = min(uTrade.quantity, maker.unfilled);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        this.openMakers.takeOrder(maker.id, volume, dollarVolume);
        return volume;
    }
    uTradeTakesOpenMakers(uTrade) {
        uTrade = {
            price: uTrade.price,
            quantity: uTrade.quantity,
            side: uTrade.side,
            time: uTrade.time,
        };
        let totalVolume = new Big(0);
        for (const order of [...this.openMakers.values()])
            if (this.uTradeShouldTakeOpenOrder(uTrade, order)) {
                this.uTradeTakesOrderQueue(uTrade, order);
                const volume = this.uTradeTakesOpenMaker(uTrade, order);
                totalVolume = totalVolume.plus(volume);
            }
        return totalVolume;
    }
    /** @override */
    updateTrades(uTrades) {
        this.pushUTrades(uTrades).catch(err => void this.emit('error', err));
        for (let uTrade of uTrades) {
            this.settlementPrice = new Big(0)
                .plus(this.settlementPrice.times(.9))
                .plus(uTrade.price.times(.1))
                .round(this.config.PRICE_DP);
            this.latestPrice = uTrade.price;
        }
        let totalVolume = new Big(0);
        for (let uTrade of uTrades) {
            const volume = this.uTradeTakesOpenMakers(uTrade);
            totalVolume = totalVolume.plus(volume);
        }
    }
    /** @override */
    updateOrderbook(orderbook) {
        this.bookManager.setBase(orderbook);
        this.bookManager.apply();
        const makers = [...this.openMakers.values()];
        for (const maker of makers) {
            this.openMakers.removeOrder(maker.id);
            this.makeOpenOrder(maker);
        }
        this.pushOrderbook().catch(err => void this.emit('error', err));
    }
}
export { Texchange, };
//# sourceMappingURL=3-taken.js.map
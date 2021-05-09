import { Texchange as Parent, } from './4.1-making';
import { Operation, min, } from './interfaces';
import Big from 'big.js';
class Texchange extends Parent {
    uTradeTakesOpenMaker(uTrade, maker) {
        const volume = min(uTrade.quantity, maker.unfilled);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        const toThaw = this.openMakers.takeOrder(maker.id, volume, dollarVolume);
        this.assets.thaw(toThaw);
        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
        if (maker.operation === Operation.OPEN) {
            this.assets.openPosition(maker.length, volume, dollarVolume, makerFee);
            this.assets.incMargin(maker.price, volume);
        }
        else {
            this.assets.closePosition(maker.length, volume, dollarVolume, makerFee);
            this.assets.decMargin(volume);
        }
        return volume;
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
            const toThaw = this.openMakers.removeOrder(maker.id);
            this.assets.thaw(toThaw);
            this.makeOpenOrder(maker);
        }
        this.pushOrderbook().catch(err => void this.emit('error', err));
    }
}
export { Texchange, };
//# sourceMappingURL=4.2-taken.js.map
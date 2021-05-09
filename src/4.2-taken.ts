import {
    Texchange as Parent,
    Events,
} from './4.1-making';
import {
    UnidentifiedTrade,
    Operation,
    OpenMaker,
    min,
    Orderbook,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';

abstract class Texchange extends Parent {
    protected uTradeTakesOpenMaker(
        uTrade: UnidentifiedTrade,
        maker: OpenMaker,
    ): Big {
        const volume = min(uTrade.quantity, maker.unfilled);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        const toThaw = this.openMakers.takeOrder(maker.id, volume, dollarVolume);

        this.assets.thaw(toThaw);
        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (maker.operation === Operation.OPEN) {
            this.assets.openPosition(
                maker.length, volume, dollarVolume, makerFee,
            );
            this.assets.incMargin(maker.price, volume);
        } else {
            this.assets.closePosition(
                maker.length, volume, dollarVolume, makerFee,
            );
            this.assets.decMargin(volume);
        }
        return volume;
    }

    /** @override */
    public updateTrades(uTrades: UnidentifiedTrade[]): void {
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
    public updateOrderbook(orderbook: Orderbook): void {
        this.bookManager.setBase(orderbook);
        this.bookManager.apply();

        const makers = [...this.openMakers.values()];
        for (const maker of makers) {
            const toThaw = this.openMakers.removeOrder(maker.id)!;
            this.assets.thaw(toThaw);
            this.makeOpenOrder(maker);
        }

        this.pushOrderbook().catch(err => void this.emit('error', err));
    }
}

export {
    Texchange,
    Events,
}

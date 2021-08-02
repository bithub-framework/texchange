import {
    Texchange as Parent,
    Events,
} from './4.1-making';
import { min } from './min';
import {
    UnidentifiedTrade,
    Operation,
    OpenMaker,
} from './interfaces';
import Big from 'big.js';
import assert = require('assert');
import { RoundingMode } from 'big.js';

abstract class Texchange extends Parent {

    /** @override */
    protected uTradeTakesOpenMaker(
        uTrade: UnidentifiedTrade,
        maker: OpenMaker,
    ): Big {
        const volume = min(uTrade.quantity, maker.unfilled);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        this.makers.takeOrder(maker.id, volume, dollarVolume);

        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (maker.operation === Operation.OPEN) {
            this.equity.openPosition(
                maker.length, volume, dollarVolume, makerFee,
            );
        } else {
            this.equity.closePosition(
                maker.length, volume, dollarVolume, makerFee,
            );
        }
        return volume;
    }

    /** @override */
    public updateTrades(uTrades: UnidentifiedTrade[]): void {
        for (const uTrade of uTrades)
            assert(uTrade.time === this.now());
        this.pushUTrades(uTrades);
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
}

export {
    Texchange,
    Events,
}

import {
    Texchange as Parent,
    Events,
} from './5.1-making';
import { min } from './min';
import {
    UnidentifiedTrade,
    Operation,
    OpenMaker,
} from './interfaces';
import Big from 'big.js';
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
        const toThaw = this.makers.takeOrder(maker.id, volume, dollarVolume);

        this.margin.thaw(toThaw);
        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (maker.operation === Operation.OPEN) {
            this.margin.incMargin(this.config.calcPositionMarginIncrement({
                spec: this.config,
                orderPrice: maker.price,
                volume,
                dollarVolume,
                settlementPrice: this.settlementPrice,
                latestPrice: this.latestPrice,
            }).round(this.config.CURRENCY_DP));
            this.equity.openPosition(
                maker.length, volume, dollarVolume, makerFee,
            );
        } else {
            this.margin.decMargin(this.config.calcPositionMarginDecrement({
                spec: this.config,
                position: this.equity.position,
                cost: this.equity.cost,
                volume,
                marginSum: this.margin.marginSum,
            }).round(this.config.CURRENCY_DP));
            this.equity.closePosition(
                maker.length, volume, dollarVolume, makerFee,
            );
        }
        return volume;
    }
}

export {
    Texchange,
    Events,
}

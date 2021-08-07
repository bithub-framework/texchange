import {
    Core as Parent,
    Events,
} from './5-margin.1-making';
import { min } from './min';
import {
    UnidentifiedTrade,
    Operation,
    OpenMaker,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';

abstract class Core extends Parent {

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
            this.margin.incPositionMargin(
                maker.length,
                this.config.calcPositionMarginIncrement({
                    spec: this.config,
                    latestPrice: this.latestPrice,
                    markPrice: this.markPrice,
                    time: this.now(),
                    volume,
                    dollarVolume,
                    order: maker,
                }).round(this.config.CURRENCY_DP),
            );
            this.equity.openPosition(
                maker.length, volume, dollarVolume, makerFee,
            );
        } else {
            this.margin.decPositionMargin(
                maker.length,
                this.config.calcPositionMarginDecrement({
                    spec: this.config,
                    latestPrice: this.latestPrice,
                    markPrice: this.markPrice,
                    time: this.now(),
                    volume,
                    dollarVolume,
                    position: this.equity.position,
                    cost: this.equity.cost,
                    balance: this.equity.balance,
                    positionMargin: this.margin.positionMargin,
                    frozenBalance: this.margin.frozenBalance,
                    frozenPosition: this.margin.frozenPosition,
                }).round(this.config.CURRENCY_DP),
            );
            this.equity.closePosition(
                maker.length, volume, dollarVolume, makerFee,
            );
        }
        return volume;
    }
}

export {
    Core,
    Events,
}

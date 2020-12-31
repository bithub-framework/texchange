import {
    LONG, SHORT, Length,
    Config,
} from './interfaces';
import AutoAssets from './auto-assets';
import Big from 'big.js';
import { Frozen } from './manager-open-orders';
import util from 'util';
import { RoundingMode } from 'big.js';

class AssetsManager extends AutoAssets {
    constructor(
        config: Config,
        getSettlementPrice: () => Big,
    ) {
        super(config, getSettlementPrice);
    }

    public freeze({ margin, position, length }: Frozen) {
        this.frozenMargin = this.frozenMargin.plus(margin);
        this.frozenPosition[length] = this.frozenPosition[length].plus(position);
    }

    public thaw({ margin, position, length }: Frozen) {
        this.frozenMargin = this.frozenMargin.minus(margin);
        this.frozenPosition[length] = this.frozenPosition[length].minus(position);
    }

    public incMargin(
        price: Big,
        volume: Big,
        settlementPrice: Big,
    ) {
        this._margin = this._margin.plus(
            this.config.calcIncreasedMargin(
                this.config,
                price,
                volume,
                settlementPrice,
            ).round(this.config.CURRENCY_DP, RoundingMode.RoundUp),
        );
    }

    public decMargin(volume: Big) {
        const totalPosition = this.position[LONG].plus(this.position[SHORT]);
        this._margin = totalPosition.eq(volume)
            ? new Big(0)
            : this._margin.minus(
                this.config.calcDecreasedMargin(
                    this.config,
                    this,
                    volume,
                ),
            );
    }

    public openPosition(
        length: Length,
        volume: Big,
        dollarVolume: Big,
        fee: Big,
    ): void {
        this.position[length] = this.position[length].plus(volume);
        this.cost[length] = this.cost[length].plus(dollarVolume);
        this.balance = this.balance.minus(fee);
    }

    public closePosition(
        length: Length,
        volume: Big,
        dollarVolume: Big,
        fee: Big,
    ): void {
        const cost = volume.eq(this.position[length])
            ? this.cost[length]
            : this.config.calcDollarVolume(
                this.cost[length].div(this.position[length]),
                volume,
            ).round(this.config.CURRENCY_DP);
        const profit = length === LONG
            ? dollarVolume.minus(cost)
            : cost.minus(dollarVolume);
        this.position[length] = this.position[length].minus(volume);
        this.cost[length] = this.cost[length].minus(cost);
        this.balance = this.balance
            .plus(profit)
            .minus(fee);
    }

    public [util.inspect.custom]() {
        return this.toJSON();
    }
}

export {
    AssetsManager as default,
    AssetsManager,
}

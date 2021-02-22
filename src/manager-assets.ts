import {
    Length,
    Config,
    Snapshot,
} from './interfaces';
import AutoAssets from './auto-assets';
import Big from 'big.js';
import { Frozen } from './manager-open-makers';
import util from 'util';

class AssetsManager extends AutoAssets {
    constructor(
        config: Config,
        snapshot: Snapshot,
        getSettlementPrice: () => Big,
        getLatestPrice: () => Big,
    ) {
        super(
            config,
            snapshot,
            getSettlementPrice,
            getLatestPrice,
        );
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
    ) {
        this.autoMargin = this.autoMargin.plus(
            this.config.calcMarginIncrement(
                this.config,
                price,
                volume,
            ).round(this.config.CURRENCY_DP),
        );
    }

    public decMargin(volume: Big) {
        const totalPosition = this.position[Length.LONG].plus(this.position[Length.SHORT]);
        this.autoMargin = totalPosition.eq(volume)
            ? new Big(0)
            : this.autoMargin.minus(
                this.config.calcMarginDecrement(
                    this.config,
                    this,
                    volume,
                ).round(this.config.CURRENCY_DP),
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
        const profit = length === Length.LONG
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

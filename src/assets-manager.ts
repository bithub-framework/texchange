import {
    Assets,
    LONG, SHORT,
    Config,
    Length,
    Side,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';
import { Frozen } from './open-order-manager';
import util from 'util';

class AssetsManager extends Assets.AutoAssets {
    constructor(
        private config: Config,
    ) {
        super(
            config.initialBalance,
            config.leverage,
            config.CURRENCY_DP,
        );
    }

    public get margin() {
        return new Big(0)
            .plus(this.cost[LONG])
            .plus(this.cost[SHORT])
            .div(this.config.leverage)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
    }

    public get reserve() {
        return this.balance
            .minus(this.margin)
            .minus(this.frozenMargin)
    }

    public freeze({ margin, position, length }: Frozen) {
        this.frozenMargin = this.frozenMargin.plus(margin);
        this.frozenPosition[length] = this.frozenPosition[length]
            .plus(position);
    }

    public thaw({ margin, position, length }: Frozen) {
        this.frozenMargin = this.frozenMargin.minus(margin);
        this.frozenPosition[length] = this.frozenPosition[length]
            .minus(position);
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
        length: Length | Side,
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

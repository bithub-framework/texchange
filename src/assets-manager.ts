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

class AssetsManager {
    private assets: Assets;

    constructor(
        private config: Config,
    ) {
        this.assets = {
            position: {
                [LONG]: new Big(0), [SHORT]: new Big(0),
            },
            balance: new Big(config.initialBalance),
            cost: {
                [LONG]: new Big(0), [SHORT]: new Big(0),
            },

            frozenMargin: new Big(0),
            frozenPosition: {
                [LONG]: new Big(0), [SHORT]: new Big(0),
            },
            margin: new Big(0),
            reserve: new Big(0),
        };
        this.getReserve();
    }

    public getAssets() {
        this.getReserve();
        return this.assets;
    }

    public getPosition() {
        return this.assets.position;
    }

    public getBalance() {
        return this.assets.balance;
    }

    public getCost() {
        return this.assets.cost;
    }

    public getFrozenMargin() {
        return this.assets.frozenMargin;
    }

    public getFrozenPosition() {
        return this.assets.frozenPosition;
    }

    public getMargin() {
        return this.assets.margin = new Big(0)
            .plus(this.assets.cost[LONG])
            .plus(this.assets.cost[SHORT])
            .div(this.config.leverage)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
    }

    public getReserve() {
        this.getMargin();
        return this.assets.reserve = this.assets.balance
            .minus(this.assets.margin)
            .minus(this.assets.frozenMargin)
    }

    public freeze({ margin, position, length }: Frozen) {
        this.assets.frozenMargin = this.assets.frozenMargin.plus(margin);
        this.assets.frozenPosition[length] = this.assets.frozenPosition[length]
            .plus(position);
    }

    public thaw({ margin, position, length }: Frozen) {
        this.assets.frozenMargin = this.assets.frozenMargin.minus(margin);
        this.assets.frozenPosition[length] = this.assets.frozenPosition[length]
            .minus(position);
    }

    public openPosition(
        length: Length | Side,
        volume: Big,
        dollarVolume: Big,
        fee: Big,
    ): void {
        this.assets.position[length] = this.assets.position[length].plus(volume);
        this.assets.cost[length] = this.assets.cost[length].plus(dollarVolume);
        this.assets.balance = this.assets.balance.minus(fee);
    }

    public closePosition(
        length: Length | Side,
        volume: Big,
        dollarVolume: Big,
        fee: Big,
    ): void {
        const cost = volume.eq(this.assets.position[length])
            ? this.assets.cost[length]
            : this.config.calcDollarVolume(
                this.assets.cost[length].div(this.assets.position[length]),
                volume,
            ).round(this.config.CURRENCY_DP);
        const profit = length === LONG
            ? dollarVolume.minus(cost)
            : cost.minus(dollarVolume);
        this.assets.position[length] = this.assets.position[length].minus(volume);
        this.assets.cost[length] = this.assets.cost[length].minus(cost);
        this.assets.balance = this.assets.balance
            .plus(profit)
            .minus(fee);
    }
}

export {
    AssetsManager as default,
    AssetsManager,
}

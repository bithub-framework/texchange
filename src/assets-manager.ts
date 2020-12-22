import {
    Assets,
    LONG, SHORT,
    Config,
    Length,
    Side,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';

class AssetsManager {
    private assets: Assets;

    constructor(private config: Config) {
        this.assets = {
            position: {
                [LONG]: new Big(0), [SHORT]: new Big(0),
            },
            leverage: config.leverage,
            balance: new Big(config.initialBalance),
            cost: {
                [LONG]: new Big(0), [SHORT]: new Big(0),
            },
            frozen: new Big(0),
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

    public getLeverage() {
        return this.assets.leverage;
    }

    public getBalance() {
        return this.assets.balance;
    }

    public getCost() {
        return this.assets.cost;
    }

    public getFrozen() {
        return this.assets.frozen;
    }

    public getMargin() {
        return this.assets.margin = new Big(0)
            .plus(this.assets.cost[LONG])
            .plus(this.assets.cost[SHORT])
            .div(this.assets.leverage)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
    }

    public getReserve() {
        this.getMargin();
        return this.assets.reserve = this.assets.balance
            .minus(this.assets.margin)
            .minus(this.assets.frozen);
    }

    public openPosition(
        length: Length | Side,
        volume: Big,
        dollarVolume: Big,
    ): void {
        this.assets.position[length] = this.assets.position[length].plus(volume);
        this.assets.cost[length] = this.assets.cost[length].plus(dollarVolume);
    }

    public closePosition(
        length: Length | Side,
        volume: Big,
        dollarVolume: Big,
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
        this.assets.balance = this.assets.balance.plus(profit);
        this.assets.position[length] = this.assets.position[length].minus(volume);
        this.assets.cost[length] = this.assets.cost[length].minus(cost);
    }

    public incBalance(increment: Big) {
        this.assets.balance = this.assets.balance
            .plus(increment);
    }

    public decBalance(decrement: Big) {
        this.assets.balance = this.assets.balance
            .minus(decrement);
    }

    public freeze(increment: Big) {
        this.assets.frozen = this.assets.frozen
            .plus(increment);
    }

    public release(decrement: Big) {
        this.assets.frozen = this.assets.frozen
            .minus(decrement);
    }
}

export {
    AssetsManager as default,
    AssetsManager,
}

import {
    Assets,
    LONG, SHORT,
    Config,
    Length,
    Side,
    DetailedOpenOrder,
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
            frozenFee: new Big(0),
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

    public getLeverage() {
        return this.assets.leverage;
    }

    public getBalance() {
        return this.assets.balance;
    }

    public getCost() {
        return this.assets.cost;
    }

    public getFrozenFee() {
        return this.assets.frozenFee;
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
            .div(this.assets.leverage)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
    }

    public getReserve() {
        this.getMargin();
        return this.assets.reserve = this.assets.balance
            .minus(this.assets.margin)
            .minus(this.assets.frozenMargin)
            .minus(this.assets.frozenFee);
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

    // public incBalance(increment: Big) {
    //     this.assets.balance = this.assets.balance
    //         .plus(increment);
    // }

    // public decBalance(decrement: Big) {
    //     this.assets.balance = this.assets.balance
    //         .minus(decrement);
    // }

    public freeze(
        margin: Big, fee: Big, position: Big,
        openOrder: DetailedOpenOrder,
    ) {
        this.freezeMargin(margin, openOrder);
        this.freezeFee(fee, openOrder);
        this.freezePosition(position, openOrder);
    }

    public release(
        margin: Big, fee: Big, position: Big,
        openOrder: DetailedOpenOrder,
    ) {
        this.releaseMargin(margin, openOrder);
        this.releaseFee(fee, openOrder);
        this.releasePosition(position, openOrder);
    }

    private freezeMargin(
        increment: Big,
        openOrder: DetailedOpenOrder,
    ) {
        if (openOrder.open) {
            this.assets.frozenMargin = this.assets.frozenMargin
                .plus(increment);
            openOrder.frozenMargin = openOrder.frozenMargin
                .plus(increment);
        }
    }

    private releaseMargin(
        decrement: Big,
        openOrder: DetailedOpenOrder,
    ) {
        if (decrement.gt(openOrder.frozenMargin))
            decrement = openOrder.frozenMargin;
        openOrder.frozenMargin = openOrder.frozenMargin
            .minus(decrement);
        this.assets.frozenMargin = this.assets.frozenMargin
            .minus(decrement);
    }

    private freezePosition(
        increment: Big,
        openOrder: DetailedOpenOrder,
    ) {
        if (!openOrder.open)
            this.assets.frozenPosition[-openOrder.side] =
                this.assets.frozenPosition[-openOrder.side]
                    .plus(increment);
    }

    private releasePosition(
        decrement: Big,
        openOrder: DetailedOpenOrder,
    ) {
        if (!openOrder.open)
            this.assets.frozenPosition[-openOrder.side] =
                this.assets.frozenPosition[-openOrder.side]
                    .minus(decrement);
    }

    private freezeFee(
        increment: Big,
        openOrder: DetailedOpenOrder,
    ) {
        this.assets.frozenFee = this.assets.frozenFee
            .plus(increment);
        if (openOrder) openOrder.frozenFee = openOrder.frozenFee
            .plus(increment);
    }

    private releaseFee(
        decrement: Big,
        openOrder: DetailedOpenOrder,
    ) {
        if (decrement.gt(openOrder.frozenFee))
            decrement = openOrder.frozenFee;
        openOrder.frozenFee = openOrder.frozenFee
            .minus(decrement);
        this.assets.frozenFee = this.assets.frozenFee
            .minus(decrement);
    }
}

export {
    AssetsManager as default,
    AssetsManager,
}

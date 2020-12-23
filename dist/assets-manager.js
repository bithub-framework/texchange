import { LONG, SHORT, } from './interfaces';
import Big from 'big.js';
class AssetsManager {
    constructor(config) {
        this.config = config;
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
    getAssets() {
        this.getReserve();
        return this.assets;
    }
    getPosition() {
        return this.assets.position;
    }
    getLeverage() {
        return this.assets.leverage;
    }
    getBalance() {
        return this.assets.balance;
    }
    getCost() {
        return this.assets.cost;
    }
    getFrozenFee() {
        return this.assets.frozenFee;
    }
    getFrozenMargin() {
        return this.assets.frozenMargin;
    }
    getFrozenPosition() {
        return this.assets.frozenPosition;
    }
    getMargin() {
        return this.assets.margin = new Big(0)
            .plus(this.assets.cost[LONG])
            .plus(this.assets.cost[SHORT])
            .div(this.assets.leverage)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
    }
    getReserve() {
        this.getMargin();
        return this.assets.reserve = this.assets.balance
            .minus(this.assets.margin)
            .minus(this.assets.frozenMargin)
            .minus(this.assets.frozenFee);
    }
    openPosition(length, volume, dollarVolume, fee) {
        this.assets.position[length] = this.assets.position[length].plus(volume);
        this.assets.cost[length] = this.assets.cost[length].plus(dollarVolume);
        this.assets.balance = this.assets.balance.minus(fee);
    }
    closePosition(length, volume, dollarVolume, fee) {
        const cost = volume.eq(this.assets.position[length])
            ? this.assets.cost[length]
            : this.config.calcDollarVolume(this.assets.cost[length].div(this.assets.position[length]), volume).round(this.config.CURRENCY_DP);
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
    freezeMargin(increment, openOrder) {
        this.assets.frozenMargin = this.assets.frozenMargin
            .plus(increment);
        if (openOrder)
            openOrder.frozenMargin = openOrder.frozenMargin
                .plus(increment);
    }
    releaseMargin(decrement, openOrder) {
        this.assets.frozenMargin = this.assets.frozenMargin
            .minus(decrement);
        if (openOrder) {
            // TODO
            if (decrement > openOrder.frozenMargin)
                decrement = openOrder.frozenMargin;
            openOrder.frozenMargin = openOrder.frozenMargin
                .minus(decrement);
        }
    }
    freezePosition(increment, length) {
        this.assets.frozenPosition[length] = this.assets.frozenPosition[length]
            .plus(increment);
    }
    releasePosition(decrement, length) {
        this.assets.frozenPosition[length] = this.assets.frozenPosition[length]
            .minus(decrement);
    }
    freezeFee(increment, openOrder) {
        this.assets.frozenFee = this.assets.frozenFee
            .plus(increment);
        if (openOrder)
            openOrder.frozenFee = openOrder.frozenFee
                .plus(increment);
    }
    releaseFee(decrement, openOrder) {
        if (openOrder) {
            if (decrement > openOrder.frozenFee)
                decrement = openOrder.frozenFee;
            openOrder.frozenFee = openOrder.frozenFee
                .minus(decrement);
        }
        this.assets.frozenFee = this.assets.frozenFee
            .minus(decrement);
    }
}
export { AssetsManager as default, AssetsManager, };
//# sourceMappingURL=assets-manager.js.map
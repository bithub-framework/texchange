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
            frozen: new Big(0),
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
    getFrozen() {
        return this.assets.frozen;
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
            .minus(this.assets.frozen);
    }
    openPosition(length, volume, dollarVolume) {
        this.assets.position[length] = this.assets.position[length].plus(volume);
        this.assets.cost[length] = this.assets.cost[length].plus(dollarVolume);
    }
    closePosition(length, volume, dollarVolume) {
        const cost = volume.eq(this.assets.position[length])
            ? this.assets.cost[length]
            : this.config.calcDollarVolume(this.assets.cost[length].div(this.assets.position[length]), volume).round(this.config.CURRENCY_DP);
        const profit = length === LONG
            ? dollarVolume.minus(cost)
            : cost.minus(dollarVolume);
        this.assets.balance = this.assets.balance.plus(profit);
        this.assets.position[length] = this.assets.position[length].minus(volume);
        this.assets.cost[length] = this.assets.cost[length].minus(cost);
    }
    incBalance(increment) {
        this.assets.balance = this.assets.balance
            .plus(increment);
    }
    decBalance(decrement) {
        this.assets.balance = this.assets.balance
            .minus(decrement);
    }
    freeze(increment) {
        this.assets.frozen = this.assets.frozen
            .plus(increment);
    }
    release(decrement) {
        this.assets.frozen = this.assets.frozen
            .minus(decrement);
    }
}
export { AssetsManager as default, AssetsManager, };
//# sourceMappingURL=assets-manager.js.map
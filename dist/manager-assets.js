import { Length, } from './interfaces';
import AutoAssets from './auto-assets';
import Big from 'big.js';
import util from 'util';
class AssetsManager extends AutoAssets {
    constructor(config, snapshot, getSettlementPrice, getLatestPrice) {
        super(config, snapshot, getSettlementPrice, getLatestPrice);
    }
    freeze(frozen) {
        this.frozenBalance = this.frozenBalance.plus(frozen.balance);
        this.frozenPosition[frozen.length] = this.frozenPosition[frozen.length].plus(frozen.position);
        if (this.reserve.lt(0) || this.closable[frozen.length].lt(0)) {
            this.thaw(frozen);
            throw new Error('No enough to freeze');
        }
    }
    thaw(frozen) {
        this.frozenBalance = this.frozenBalance.minus(frozen.balance);
        this.frozenPosition[frozen.length] = this.frozenPosition[frozen.length].minus(frozen.position);
        if (this.frozenBalance.lt(0) || this.frozenPosition[frozen.length].lt(0)) {
            this.freeze(frozen);
            throw new Error('No enough to thaw');
        }
    }
    incMargin(price, volume) {
        this.staticMargin = this.staticMargin.plus(this.config.calcMarginIncrement(this.config, price, volume).round(this.config.CURRENCY_DP));
    }
    decMargin(volume) {
        const totalPosition = this.position[Length.LONG].plus(this.position[Length.SHORT]);
        this.staticMargin = totalPosition.eq(volume)
            ? new Big(0)
            : this.staticMargin.minus(this.config.calcMarginDecrement(this.config, this, volume).round(this.config.CURRENCY_DP));
    }
    openPosition(length, volume, dollarVolume, fee) {
        this.position[length] = this.position[length].plus(volume);
        this.cost[length] = this.cost[length].plus(dollarVolume);
        this.balance = this.balance.minus(fee);
    }
    closePosition(length, volume, dollarVolume, fee) {
        const cost = volume.eq(this.position[length])
            ? this.cost[length]
            : this.config.calcDollarVolume(this.cost[length].div(this.position[length]), volume).round(this.config.CURRENCY_DP);
        const profit = length === Length.LONG
            ? dollarVolume.minus(cost)
            : cost.minus(dollarVolume);
        this.position[length] = this.position[length].minus(volume);
        this.cost[length] = this.cost[length].minus(cost);
        this.balance = this.balance
            .plus(profit)
            .minus(fee);
    }
    [util.inspect.custom]() {
        return this.toJSON();
    }
}
export { AssetsManager as default, AssetsManager, };
//# sourceMappingURL=manager-assets.js.map
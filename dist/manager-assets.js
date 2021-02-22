import { Length, } from './interfaces';
import AutoAssets from './auto-assets';
import Big from 'big.js';
import util from 'util';
class AssetsManager extends AutoAssets {
    constructor(config, snapshot, getSettlementPrice, getLatestPrice) {
        super(config, snapshot, getSettlementPrice, getLatestPrice);
    }
    freeze({ margin, position, length }) {
        this.frozenMargin = this.frozenMargin.plus(margin);
        this.frozenPosition[length] = this.frozenPosition[length].plus(position);
    }
    thaw({ margin, position, length }) {
        this.frozenMargin = this.frozenMargin.minus(margin);
        this.frozenPosition[length] = this.frozenPosition[length].minus(position);
    }
    incMargin(price, volume) {
        this.autoMargin = this.autoMargin.plus(this.config.calcMarginIncrement(this.config, price, volume).round(this.config.CURRENCY_DP));
    }
    decMargin(volume) {
        const totalPosition = this.position[Length.LONG].plus(this.position[Length.SHORT]);
        this.autoMargin = totalPosition.eq(volume)
            ? new Big(0)
            : this.autoMargin.minus(this.config.calcMarginDecrement(this.config, this, volume).round(this.config.CURRENCY_DP));
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
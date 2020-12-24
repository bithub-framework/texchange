import { Assets, LONG, } from './interfaces';
import util from 'util';
class AssetsManager extends Assets.AutoAssets {
    constructor(config) {
        super(config.initialBalance, config.leverage, config.CURRENCY_DP);
        this.config = config;
    }
    freeze({ margin, position, length }) {
        this.frozenMargin = this.frozenMargin.plus(margin);
        this.frozenPosition[length] = this.frozenPosition[length].plus(position);
    }
    thaw({ margin, position, length }) {
        this.frozenMargin = this.frozenMargin.minus(margin);
        this.frozenPosition[length] = this.frozenPosition[length].minus(position);
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
        const profit = length === LONG
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
//# sourceMappingURL=assets-manager.js.map
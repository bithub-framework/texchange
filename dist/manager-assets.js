import { LONG, SHORT, } from './interfaces';
import AutoAssets from './auto-assets';
import Big from 'big.js';
import util from 'util';
class AssetsManager extends AutoAssets {
    constructor(config, getSettlementPrice) {
        super(config, getSettlementPrice);
    }
    freeze({ margin, position, length }) {
        this.frozenMargin = this.frozenMargin.plus(margin);
        this.frozenPosition[length] = this.frozenPosition[length].plus(position);
    }
    thaw({ margin, position, length }) {
        this.frozenMargin = this.frozenMargin.minus(margin);
        this.frozenPosition[length] = this.frozenPosition[length].minus(position);
    }
    incMargin(price, volume, settlementPrice) {
        this._margin = this._margin.plus(this.config.calcIncreasedMargin(this.config, price, volume, settlementPrice).round(this.config.CURRENCY_DP, 3 /* RoundUp */));
    }
    decMargin(volume) {
        const totalPosition = this.position[LONG].plus(this.position[SHORT]);
        this._margin = totalPosition.eq(volume)
            ? new Big(0)
            : this._margin.minus(this.config.calcDecreasedMargin(this.config, this, volume));
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
//# sourceMappingURL=manager-assets.js.map
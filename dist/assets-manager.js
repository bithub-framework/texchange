import { Assets, LONG, SHORT, } from './interfaces';
import Big from 'big.js';
import util from 'util';
class AssetsManager extends Assets {
    constructor(config) {
        super({
            ...config,
            balance: new Big(config.initialBalance),
            position: {
                [LONG]: new Big(0), [SHORT]: new Big(0),
            },
            cost: {
                [LONG]: new Big(0), [SHORT]: new Big(0),
            },
            frozenMargin: new Big(0),
            frozenPosition: {
                [LONG]: new Big(0), [SHORT]: new Big(0),
            },
        });
        this.config = config;
        // @ts-ignore
        AssetsManager.prototype[util.inspect.custom] = function () {
            // @ts-ignore
            return this.toJSON();
        };
    }
    get margin() {
        return new Big(0)
            .plus(this.cost[LONG])
            .plus(this.cost[SHORT])
            .div(this.config.leverage)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
    }
    get reserve() {
        return this.balance
            .minus(this.margin)
            .minus(this.frozenMargin);
    }
    freeze({ margin, position, length }) {
        this.frozenMargin = this.frozenMargin.plus(margin);
        this.frozenPosition[length] = this.frozenPosition[length]
            .plus(position);
    }
    thaw({ margin, position, length }) {
        this.frozenMargin = this.frozenMargin.minus(margin);
        this.frozenPosition[length] = this.frozenPosition[length]
            .minus(position);
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
}
export { AssetsManager as default, AssetsManager, };
//# sourceMappingURL=assets-manager.js.map
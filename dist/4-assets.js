import { Taken } from './3-taken';
import { LONG, SHORT, OPEN, CLOSE, clone, } from './interfaces';
import Big from 'big.js';
import { AssetsManager } from './manager-assets';
import assert from 'assert';
class ManagingAssets extends Taken {
    constructor(config, now) {
        super(config, now);
        this.assets = new AssetsManager(config, () => this.settlementPrice, () => this.latestPrice);
    }
    async makeLimitOrder(order) {
        this.validateOrder(order);
        this.enoughPosition(order);
        this.settle();
        this.enoughReserve(order);
        const [makerOrder, uTrades] = this.orderTakes(order);
        const openOrder = this.orderMakes(makerOrder);
        if (uTrades.length) {
            this.pushUTrades(uTrades);
            this.pushOrderbook();
        }
        return openOrder.id;
    }
    async cancelOrder(oid) {
        const toThaw = this.openOrders.removeOrder(oid);
        this.assets.thaw(toThaw);
    }
    async getAssets() {
        this.settle();
        this.assets.time = this.now();
        return this.assets;
    }
    enoughPosition(order) {
        assert(order.operation === OPEN ||
            order.quantity.lte(new Big(0)
                .plus(this.assets.position[order.side * order.operation])
                .minus(this.assets.frozenPosition[order.side * order.operation])));
    }
    enoughReserve(order) {
        assert(order.operation === CLOSE || new Big(0)
            .plus(this.config.calcInitialMargin(this.config, order, this.settlementPrice, this.latestPrice)).plus(this.config.calcDollarVolume(order.price, order.quantity).times(this.config.TAKER_FEE_RATE)).round(this.config.CURRENCY_DP)
            .lte(this.assets.reserve));
    }
    orderTakes(taker) {
        const [makerOrder, uTrades, volume, dollarVolume] = super.orderTakes(taker);
        const takerFee = dollarVolume.times(this.config.TAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
        if (taker.operation === OPEN) {
            this.assets.openPosition(taker.length, volume, dollarVolume, takerFee);
            this.assets.incMargin(taker.price, volume);
        }
        else {
            this.assets.closePosition(taker.length, volume, dollarVolume, takerFee);
            this.assets.decMargin(volume);
        }
        return [makerOrder, uTrades, volume, dollarVolume];
    }
    orderMakes(order) {
        const openOrder = {
            ...order,
            id: ++this.orderCount,
        };
        const toFreeze = this.openOrders.addOrder(openOrder);
        this.assets.freeze(toFreeze);
        return openOrder;
    }
    uTradeTakesOpenOrder(uTrade, maker) {
        const [volume, dollarVolume, toThaw] = super.uTradeTakesOpenOrder(uTrade, maker);
        this.assets.thaw(toThaw);
        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
        if (maker.operation === OPEN) {
            this.assets.openPosition(maker.length, volume, dollarVolume, makerFee);
            this.assets.incMargin(maker.price, volume);
        }
        else {
            this.assets.closePosition(maker.length, volume, dollarVolume, makerFee);
            this.assets.decMargin(volume);
        }
        return [volume, dollarVolume, toThaw];
    }
    settle() {
        const position = clone(this.assets.position);
        for (const length of [LONG, SHORT]) {
            const settlementDollarVolume = this.config.calcDollarVolume(this.settlementPrice, position[length]).round(this.config.CURRENCY_DP);
            this.assets.closePosition(length, position[length], settlementDollarVolume, new Big(0));
            this.assets.openPosition(length, position[length], settlementDollarVolume, new Big(0));
        }
    }
}
export { ManagingAssets as default, ManagingAssets, };
//# sourceMappingURL=4-assets.js.map
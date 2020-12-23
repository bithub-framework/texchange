import { Taken } from './3-taken';
import { LONG, SHORT, } from './interfaces';
import Big from 'big.js';
import { AssetsManager } from './assets-manager';
class ManagingAssets extends Taken {
    constructor(config, now) {
        super(config, now);
        this.settlementPrice = new Big(0);
        this.assetsManager = new AssetsManager(config);
    }
    async makeLimitOrder(order) {
        if (!order.open && this.enoughPosition(order))
            throw new Error('No enough position to close.');
        this.settle();
        if (!this.enoughReserve(order))
            throw new Error('No enough available balance as margin.');
        // 由于精度问题，开仓成功后也可能 reserve 为负。
        const [makerOrder, rawTrades] = this.orderTakes(order);
        const openOrder = this.orderMakes(makerOrder);
        if (rawTrades.length)
            this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }
    async cancelOrder(oid) {
        const openOrder = this.openOrders.get(oid);
        if (openOrder) {
            this.assetsManager.releaseMargin(openOrder.frozenMargin);
            this.assetsManager.releaseFee(openOrder.frozenFee);
            if (!openOrder.open)
                this.assetsManager.releasePosition(openOrder.quantity, -openOrder.side);
        }
        await super.cancelOrder(oid);
    }
    async getAssets() {
        this.settle();
        return this.assetsManager.getAssets();
    }
    updateTrades(rawTrades) {
        for (let rawTrade of rawTrades) {
            this.settlementPrice = new Big(0)
                .plus(this.settlementPrice.times(.9))
                .plus(rawTrade.price.times(.1))
                .round(this.config.PRICE_DP);
            this.rawTradeTakesOpenOrders(rawTrade);
        }
        this.pushRawTrades(rawTrades);
    }
    enoughPosition(order) {
        return order.quantity.lte(new Big(0)
            .plus(this.assetsManager.getPosition()[-order.side])
            .minus(this.assetsManager.getFrozenPosition()[-order.side]));
    }
    enoughReserve(order) {
        return order.open && new Big(0)
            .plus(this.config.calcDollarVolume(order.price, order.quantity).div(this.assetsManager.getLeverage()))
            .plus(this.config.calcDollarVolume(order.price, order.quantity).times(this.config.TAKER_FEE))
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */)
            .lte(this.assetsManager.getReserve());
    }
    orderTakes(taker) {
        const [makerOrder, rawTrades, volume, dollarVolume] = super.orderTakes(taker);
        const takerFee = dollarVolume.times(this.config.TAKER_FEE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
        if (taker.open)
            this.assetsManager.openPosition(taker.side, volume, dollarVolume, takerFee);
        else
            this.assetsManager.closePosition(-taker.side, volume, dollarVolume, takerFee);
        return [makerOrder, rawTrades, volume, dollarVolume];
    }
    orderMakes(order) {
        const openOrder = super.orderMakes(order);
        const dollarVolume = this.config.calcDollarVolume(openOrder.price, openOrder.quantity);
        if (openOrder.open)
            this.assetsManager.freezeMargin(dollarVolume.div(this.assetsManager.getLeverage())
                .round(this.config.CURRENCY_DP, 3 /* RoundUp */), openOrder);
        this.assetsManager.freezeFee(dollarVolume.times(this.config.MAKER_FEE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */), openOrder);
        if (!openOrder.open)
            this.assetsManager.freezePosition(openOrder.quantity, -openOrder.side);
        return openOrder;
    }
    rawTradeTakesOpenOrders(_rawTrade) {
        const rawTrade = { ..._rawTrade };
        for (const openOrder of this.openOrders.values())
            if (this.rawTradeShouldTakeOpenOrder(rawTrade, openOrder)) {
                const [volume, dollarVolume] = this.rawTradeTakesOpenOrder(rawTrade, openOrder);
                this.assetsManager.releaseMargin(dollarVolume.div(this.assetsManager.getLeverage())
                    .round(this.config.CURRENCY_DP), openOrder);
                const makerFee = dollarVolume.times(this.config.MAKER_FEE)
                    .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
                this.assetsManager.releaseFee(makerFee, openOrder);
                if (!openOrder.open)
                    this.assetsManager.releasePosition(volume, -openOrder.side);
                if (openOrder.open)
                    this.assetsManager.openPosition(openOrder.side, volume, dollarVolume, makerFee);
                else
                    this.assetsManager.closePosition(-openOrder.side, volume, dollarVolume, makerFee);
            }
    }
    settle() {
        const position = { ...this.assetsManager.getPosition() };
        for (const length of [LONG, SHORT]) {
            const settlementDollarVolume = this.config.calcDollarVolume(this.settlementPrice, position[length]).round(this.config.CURRENCY_DP);
            this.assetsManager.closePosition(length, position[length], settlementDollarVolume, new Big(0));
            this.assetsManager.openPosition(length, position[length], settlementDollarVolume, new Big(0));
        }
    }
}
export { ManagingAssets as default, ManagingAssets, };
//# sourceMappingURL=4-assets.js.map
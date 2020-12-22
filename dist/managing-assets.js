import { MakingOrder } from './making-order';
import { LONG, SHORT, min, } from './interfaces';
import { PRICE_DP, DOLLAR_DP, } from './config';
import Big from 'big.js';
class ManagingAssets extends MakingOrder {
    constructor(config, now) {
        super(now);
        this.config = config;
        this.settlementPrice = new Big(0);
        this.assets = config.initialAssets;
    }
    openPosition(length, volume, dollarVolume) {
        this.assets.position[length] = this.assets.position[length].plus(volume);
        this.assets.cost[length] = this.assets.cost[length].plus(dollarVolume);
    }
    closePosition(length, volume, dollarVolume) {
        const cost = volume.eq(this.assets.position[length])
            ? this.assets.cost[length]
            : volume
                .times(this.assets.cost[length])
                .div(this.assets.position[length])
                .round(DOLLAR_DP);
        const profit = length === LONG
            ? dollarVolume.minus(cost)
            : cost.minus(dollarVolume);
        this.assets.balance = this.assets.balance.plus(profit);
        this.assets.position[length] = this.assets.position[length].minus(volume);
        this.assets.cost[length] = this.assets.cost[length].minus(cost);
    }
    async makeLimitOrder(order) {
        if (!order.open &&
            order.quantity.gt(this.assets.position[-order.side]))
            throw new Error('No enough position to close.');
        this.settle();
        if (order.open && new Big(0)
            .plus(order.price.times(order.quantity).div(this.assets.leverage))
            .plus(order.price.times(order.quantity).times(this.config.TAKER_FEE))
            .round(DOLLAR_DP, 3 /* RoundUp */)
            .gt(this.assets.reserve))
            throw new Error('No enough available balance as margin.');
        // 由于精度问题，开仓成功后也可能 reserve 为负。
        const [makerOrder, rawTrades, volume, dollarVolume,] = this.orderTakes(order);
        const takerFee = dollarVolume.times(this.config.TAKER_FEE)
            .round(DOLLAR_DP, 3 /* RoundUp */);
        this.assets.balance = this.assets.balance.minus(takerFee);
        if (order.open)
            this.openPosition(order.side, volume, dollarVolume);
        else
            this.closePosition(-order.side, volume, dollarVolume);
        const openOrder = this.orderMakes(makerOrder);
        this.assets.frozen = this.assets.frozen
            .plus(openOrder.frozen);
        this.calcMargin();
        this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }
    async cancelOrder(oid) {
        const openOrder = this.openOrders.get(oid);
        if (openOrder) {
            this.assets.frozen = this.assets.frozen
                .minus(openOrder.frozen);
        }
        this.calcMargin();
        await super.cancelOrder(oid);
    }
    async getAssets() {
        this.settle();
        return this.assets;
    }
    updateTrades(rawTrades) {
        for (let rawTrade of rawTrades) {
            this.settlementPrice = new Big(0)
                .plus(this.settlementPrice.times(.9))
                .plus(rawTrade.price.times(.1))
                .round(PRICE_DP);
            this.rawTradeTakesOpenOrders(rawTrade);
        }
        this.pushRawTrades(rawTrades);
    }
    orderMakes(order) {
        const openOrder = {
            ...order,
            id: ++this.orderCount,
            frozen: new Big(0)
                .plus(order.price.times(order.quantity).div(this.assets.leverage))
                .plus(order.price.times(order.quantity).times(this.config.MAKER_FEE))
                .round(DOLLAR_DP, 3 /* RoundUp */),
        };
        if (openOrder.quantity.gt(0))
            this.openOrders.set(openOrder.id, openOrder);
        return openOrder;
    }
    rawTradeTakesOpenOrders(_rawTrade) {
        const rawTrade = { ..._rawTrade };
        for (const openOrder of this.openOrders.values())
            if (this.rawTradeShouldTakeOpenOrder(rawTrade, openOrder)) {
                const [volume, dollarVolume,] = this.rawTradeTakesOpenOrder(rawTrade, openOrder);
                const released = min(new Big(0)
                    .plus(dollarVolume.div(this.assets.leverage))
                    .plus(dollarVolume.times(this.config.MAKER_FEE))
                    .round(DOLLAR_DP), openOrder.frozen);
                openOrder.frozen = openOrder.frozen.minus(released);
                this.assets.frozen = this.assets.frozen.minus(released);
                this.assets.balance = this.assets.balance
                    .minus(dollarVolume.times(this.config.MAKER_FEE))
                    .round(DOLLAR_DP, 0 /* RoundDown */);
                if (openOrder.open)
                    this.openPosition(openOrder.side, volume, dollarVolume);
                else
                    this.closePosition(-openOrder.side, volume, dollarVolume);
                this.calcMargin();
            }
    }
    settle() {
        const position = { ...this.assets.position };
        for (const length of [LONG, SHORT]) {
            const settlementDollarVolume = new Big(0)
                .plus(this.settlementPrice.times(position[length]))
                .round(DOLLAR_DP);
            this.closePosition(length, position[length], settlementDollarVolume);
            this.openPosition(length, position[length], settlementDollarVolume);
        }
        this.calcMargin();
    }
    calcMargin() {
        this.assets.margin = new Big(0)
            .plus(this.assets.cost[LONG])
            .plus(this.assets.cost[SHORT])
            .div(this.assets.leverage)
            .round(DOLLAR_DP, 3 /* RoundUp */);
        this.assets.reserve = this.assets.balance
            .minus(this.assets.margin)
            .minus(this.assets.frozen);
    }
}
export { ManagingAssets as default, ManagingAssets, };
//# sourceMappingURL=managing-assets.js.map
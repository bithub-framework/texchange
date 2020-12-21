import { MakingOrder } from './making-order';
import { LONG, SHORT, } from './interfaces';
import { PRICE_DP, DOLLAR_DP, } from './config';
import { clone } from 'ramda';
import { Big, } from 'big.js';
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
        const costPrice = this.assets.cost[length].div(this.assets.position[length]);
        const cost = volume.eq(this.assets.position[length])
            ? this.assets.cost[length]
            // TODO
            : volume.times(costPrice).round(DOLLAR_DP);
        const realizedProfit = length === LONG
            ? dollarVolume.minus(cost)
            : cost.minus(dollarVolume);
        this.assets.balance = this.assets.balance.plus(realizedProfit);
        this.assets.position[length] = this.assets.position[length].minus(volume);
        this.assets.cost[length] = this.assets.cost[length].minus(cost);
    }
    async makeLimitOrder(order) {
        if (!order.open &&
            order.quantity.gt(this.assets.position[1 - order.side]))
            throw new Error('No enough position to close.');
        this.settle();
        if (order.open &&
            order.price.times(order.quantity).div(this.assets.leverage)
                .round(DOLLAR_DP, 3 /* RoundUp */).plus(order.price.times(order.quantity).times(this.config.TAKER_FEE)
                .round(DOLLAR_DP, 3 /* RoundUp */)).lt(this.assets.reserve))
            throw new Error('No enough available balance as margin.');
        // 由于精度问题，开仓成功后也可能 reserve 为负。
        const [makerOrder, rawTrades, volume, dollarVolume,] = this.orderTakes(order);
        const takerFee = dollarVolume.times(this.config.TAKER_FEE)
            .round(DOLLAR_DP, 3 /* RoundUp */);
        this.assets.balance = this.assets.balance.minus(takerFee);
        if (order.open)
            this.openPosition(order.side, volume, dollarVolume);
        else
            this.closePosition(1 - order.side, volume, dollarVolume);
        const openOrder = this.orderMakes(makerOrder);
        if (this.openOrders.has(openOrder.id)) {
            this.assets.frozen = this.assets.frozen
                .plus(openOrder.price.times(openOrder.quantity).div(this.assets.leverage))
                .round(DOLLAR_DP, 3 /* RoundUp */)
                .plus(openOrder.price.times(openOrder.quantity).times(this.config.MAKER_FEE))
                .round(DOLLAR_DP, 3 /* RoundUp */);
        }
        this.calcMargin();
        this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }
    async cancelOrder(oid) {
        let openOrder;
        if (openOrder = this.openOrders.get(oid)) {
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
                .round(DOLLAR_DP, 3 /* RoundUp */)
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
                const released = this.openOrders.has(openOrder.id)
                    ? new Big(0)
                        .plus(dollarVolume.div(this.assets.leverage))
                        .plus(dollarVolume.times(this.config.MAKER_FEE))
                        .round(DOLLAR_DP, 0 /* RoundDown */)
                    : openOrder.frozen;
                openOrder.frozen = openOrder.frozen
                    .minus(released);
                this.assets.frozen = this.assets.frozen
                    .minus(released);
                this.assets.balance = this.assets.balance
                    .minus(dollarVolume.times(this.config.MAKER_FEE))
                    .round(DOLLAR_DP, 0 /* RoundDown */);
                if (openOrder.open)
                    this.openPosition(openOrder.side, volume, dollarVolume);
                else
                    this.closePosition(1 - openOrder.side, volume, dollarVolume);
                this.calcMargin();
            }
    }
    settle() {
        const price = this.settlementPrice;
        const assets = clone(this.assets);
        for (const length of [LONG, SHORT]) {
            const settlementDollarVolume = new Big(0)
                .plus(price.times(assets.position[length]))
                .round(DOLLAR_DP, length === LONG ? 0 /* RoundDown */ : 3 /* RoundUp */);
            this.closePosition(length, assets.position[length], settlementDollarVolume);
            this.openPosition(length, assets.position[length], settlementDollarVolume);
        }
        this.calcMargin();
    }
    calcMargin() {
        const { cost, leverage, balance, margin, frozen, } = this.assets;
        this.assets.margin = new Big(0)
            .plus(cost[LONG])
            .plus(cost[SHORT])
            .div(leverage)
            .round(DOLLAR_DP, 3 /* RoundUp */);
        this.assets.reserve = balance.minus(margin).minus(frozen);
    }
}
export { ManagingAssets as default, ManagingAssets, };
//# sourceMappingURL=managing-assets.js.map
import { MakingOrder } from './making-order';
import { ASK, LONG, SHORT, } from './interfaces';
import { EPSILON, } from './config';
class ManagingAssets extends MakingOrder {
    constructor(config, now) {
        super(now);
        this.config = config;
        this.settlementPrice = 0;
        this.assets = config.initialAssets;
    }
    openPosition(side, volume, dollarVolume) {
        this.assets.position[side] += volume;
        this.assets.cost[side] += dollarVolume;
    }
    closePosition(side, volume, dollarVolume) {
        const costPrice = Math.round(100 *
            this.assets.cost[1 - side] / this.assets.position[1 - side]) / 100;
        const cost = volume > this.assets.position[1 - side] - EPSILON
            ? this.assets.cost[1 - side]
            : volume * costPrice;
        const realizedProfit = side === ASK
            ? dollarVolume - cost
            : cost - dollarVolume;
        this.assets.balance += realizedProfit;
        this.assets.position[1 - side] -= volume;
        this.assets.cost[1 - side] -= cost;
    }
    async makeLimitOrder(order) {
        if (!order.open &&
            order.quantity > this.assets.position[1 - order.side] + EPSILON)
            throw new Error('No enough position to close.');
        this.settle();
        if (order.open &&
            order.price * order.quantity * (1 + this.config.TAKER_FEE)
                < this.assets.reserve * this.assets.leverage - EPSILON)
            throw new Error('No enough available balance as margin.');
        const [makerOrder, rawTrades, volume, dollarVolume,] = this.orderTakes(order);
        this.assets.balance -= dollarVolume * this.config.TAKER_FEE;
        if (order.open)
            this.openPosition(order.side, volume, dollarVolume);
        else
            this.closePosition(order.side, volume, dollarVolume);
        const openOrder = this.orderMakes(makerOrder);
        if (this.openOrders.has(openOrder.id))
            this.assets.frozen +=
                openOrder.price *
                    openOrder.quantity *
                    (1 + this.config.MAKER_FEE);
        this.calcMargin();
        this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }
    async cancelOrder(oid) {
        let openOrder;
        if (openOrder = this.openOrders.get(oid)) {
            this.assets.frozen -=
                openOrder.price *
                    openOrder.quantity *
                    (1 + this.config.MAKER_FEE);
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
            this.settlementPrice
                = this.settlementPrice * .9
                    + rawTrade.price + .1;
            this.rawTradeTakesOpenOrders(rawTrade);
        }
        this.pushRawTrades(rawTrades);
    }
    rawTradeTakesOpenOrders(_rawTrade) {
        const rawTrade = { ..._rawTrade };
        for (const order of this.openOrders.values())
            if (this.rawTradeShouldTakeOpenOrder(rawTrade, order)) {
                const [volume, dollarVolume,] = this.rawTradeTakesOpenOrder(rawTrade, order);
                this.assets.frozen -= dollarVolume * (1 + this.config.MAKER_FEE);
                this.assets.balance -= dollarVolume * this.config.MAKER_FEE;
                if (order.open)
                    this.openPosition(order.side, volume, dollarVolume);
                else
                    this.closePosition(order.side, volume, dollarVolume);
                this.calcMargin();
            }
    }
    settle() {
        const price = this.settlementPrice;
        const { position, cost, } = this.assets;
        const unrealizedProfit = (price * position[LONG] - cost[LONG]) +
            (cost[SHORT] - price * position[SHORT]);
        this.assets.balance += unrealizedProfit;
        this.assets.cost[LONG] = price * position[LONG];
        this.assets.cost[SHORT] = price * position[SHORT];
        this.calcMargin();
    }
    calcMargin() {
        const { cost, leverage, balance, margin, frozen, } = this.assets;
        this.assets.margin[LONG] = cost[LONG] / leverage;
        this.assets.margin[SHORT] = cost[SHORT] / leverage;
        this.assets.reserve = balance - (margin[LONG] + margin[SHORT]) - frozen;
    }
}
export { ManagingAssets as default, ManagingAssets, };
//# sourceMappingURL=managing-assets.js.map
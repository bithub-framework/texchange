import { MakingOrder } from './making-order';
import { ASK, LONG, SHORT, round, trunc, } from './interfaces';
import { EPSILON, PRICE_PRECISION, QUANTITY_PRECISION, COST_PRECISION, BALANCE_PRECISION, } from './config';
class ManagingAssets extends MakingOrder {
    constructor(config, now) {
        super(now);
        this.config = config;
        this.settlementPrice = 0;
        this.assets = config.initialAssets;
    }
    openPosition(side, volume, dollarVolume) {
        this.assets.position[side] = round(this.assets.position[side] + volume, QUANTITY_PRECISION);
        this.assets.cost[side] = round(this.assets.cost[side] + dollarVolume, COST_PRECISION);
    }
    closePosition(side, volume, dollarVolume) {
        const costPrice = trunc(this.assets.cost[1 - side] / this.assets.position[1 - side], PRICE_PRECISION);
        const cost = volume > this.assets.position[1 - side] - EPSILON
            ? this.assets.cost[1 - side]
            : volume * costPrice;
        const realizedProfit = side === ASK
            ? dollarVolume - cost
            : cost - dollarVolume;
        this.assets.balance = round(this.assets.balance + realizedProfit, BALANCE_PRECISION);
        this.assets.position[1 - side] = round(this.assets.position[1 - side] - volume, QUANTITY_PRECISION);
        this.assets.cost[1 - side] = round(this.assets.cost[1 - side] - cost, COST_PRECISION);
    }
    async makeLimitOrder(order) {
        if (!order.open &&
            order.quantity > this.assets.position[1 - order.side] + EPSILON)
            throw new Error('No enough position to close.');
        this.settle();
        if (order.open &&
            order.price * order.quantity / this.assets.leverage +
                order.price * order.quantity * this.config.TAKER_FEE
                < this.assets.reserve - EPSILON)
            throw new Error('No enough available balance as margin.');
        const [makerOrder, rawTrades, volume, dollarVolume,] = this.orderTakes(order);
        this.assets.balance = round(this.assets.balance - dollarVolume * this.config.TAKER_FEE, BALANCE_PRECISION);
        if (order.open)
            this.openPosition(order.side, volume, dollarVolume);
        else
            this.closePosition(order.side, volume, dollarVolume);
        const openOrder = this.orderMakes(makerOrder);
        if (this.openOrders.has(openOrder.id))
            this.assets.frozen = round(this.assets.frozen +
                openOrder.price * openOrder.quantity / this.assets.leverage +
                openOrder.price * openOrder.quantity * this.config.MAKER_FEE, BALANCE_PRECISION);
        this.calcMargin();
        this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }
    async cancelOrder(oid) {
        let openOrder;
        if (openOrder = this.openOrders.get(oid)) {
            this.assets.frozen = round(this.assets.frozen -
                openOrder.price * openOrder.quantity / this.assets.leverage +
                openOrder.price * openOrder.quantity * this.config.MAKER_FEE, BALANCE_PRECISION);
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
                = round(this.settlementPrice * .9 + rawTrade.price + .1, PRICE_PRECISION);
            this.rawTradeTakesOpenOrders(rawTrade);
        }
        this.pushRawTrades(rawTrades);
    }
    rawTradeTakesOpenOrders(_rawTrade) {
        const rawTrade = { ..._rawTrade };
        for (const order of this.openOrders.values())
            if (this.rawTradeShouldTakeOpenOrder(rawTrade, order)) {
                const [volume, dollarVolume,] = this.rawTradeTakesOpenOrder(rawTrade, order);
                this.assets.frozen = round(this.assets.frozen -
                    dollarVolume / this.assets.leverage +
                    dollarVolume * this.config.MAKER_FEE, BALANCE_PRECISION);
                this.assets.balance = round(this.assets.balance -
                    dollarVolume * this.config.MAKER_FEE, BALANCE_PRECISION);
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
        this.assets.balance = round(this.assets.balance + unrealizedProfit, BALANCE_PRECISION);
        this.assets.cost[LONG] = price * position[LONG];
        this.assets.cost[SHORT] = price * position[SHORT];
        this.calcMargin();
    }
    calcMargin() {
        const { cost, leverage, balance, margin, frozen, } = this.assets;
        this.assets.margin = (cost[LONG] + cost[SHORT]) / leverage;
        this.assets.reserve = balance - margin - frozen;
    }
}
export { ManagingAssets as default, ManagingAssets, };
//# sourceMappingURL=managing-assets.js.map
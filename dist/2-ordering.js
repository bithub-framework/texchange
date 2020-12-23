import { Pushing } from './1-pushing';
import { BID, ASK, min, } from './interfaces';
import Big from 'big.js';
import { OpenOrderManager } from './open-order-manager';
class Ordering extends Pushing {
    constructor(config, now) {
        super(config, now);
        this.orderCount = 0;
        this.openOrderManager = new OpenOrderManager(config);
    }
    // 由于精度原因，实际成本不一定恰好等于 order.price
    async makeLimitOrder(order) {
        const [makerOrder, rawTrades] = this.orderTakes(order);
        const openOrder = this.orderMakes(makerOrder);
        if (rawTrades.length)
            this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }
    async cancelOrder(oid) {
        this.openOrderManager.delete(oid);
    }
    async getOpenOrders() {
        return [...this.openOrderManager.getOpenOrders().values()];
    }
    orderTakes(_taker) {
        const taker = { ..._taker };
        const rawTrades = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        const orderbook = this.orderbookManager.getOrderbook();
        for (const maker of orderbook[-taker.side]) {
            if (taker.side === BID && taker.price.gte(maker.price) ||
                taker.side === ASK && taker.price.lte(maker.price)) {
                const quantity = min(taker.quantity, maker.quantity);
                rawTrades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: this.now(),
                });
                this.orderbookManager.decQuantity(maker.side, maker.price, quantity);
                taker.quantity = taker.quantity.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(this.config.calcDollarVolume(maker.price, quantity))
                    .round(this.config.CURRENCY_DP);
            }
        }
        return [taker, rawTrades, volume, dollarVolume];
    }
    orderMakes(order) {
        const [openOrder] = this.openOrderManager.addOrder(++this.orderCount, order);
        return openOrder;
    }
}
export { Ordering as default, Ordering, };
//# sourceMappingURL=2-ordering.js.map
import { Pushing } from './1-pushing';
import { BID, ASK, LONG, SHORT, OPEN, CLOSE, min, clone, } from './interfaces';
import Big from 'big.js';
import { OpenOrderManager } from './manager-open-orders';
import assert from 'assert';
class Ordering extends Pushing {
    constructor(config, now) {
        super(config, now);
        this.orderCount = 0;
        this.openOrders = new OpenOrderManager(config);
    }
    // 由于精度原因，实际成本不一定恰好等于 order.price
    async makeLimitOrder(order) {
        this.validateOrder(order);
        const [makerOrder, rawTrades] = this.orderTakes(order);
        const openOrder = this.orderMakes(makerOrder);
        if (rawTrades.length) {
            this.pushRawTrades(rawTrades);
            this.pushOrderbook();
        }
        return openOrder.id;
    }
    async cancelOrder(oid) {
        this.openOrders.removeOrder(oid);
    }
    async getOpenOrders() {
        return [...this.openOrders.values()];
    }
    validateOrder(order) {
        assert(order.price.eq(order.price.round(this.config.PRICE_DP)));
        assert(order.quantity.gt(0));
        assert(order.quantity.eq(order.quantity.round(this.config.QUANTITY_DP)));
        assert(order.length === LONG || order.length === SHORT);
        assert(order.operation === OPEN || order.operation === CLOSE);
        assert(order.operation * order.length === order.side);
    }
    orderTakes(taker) {
        taker = clone(taker);
        const rawTrades = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        for (const maker of this.orderbook[-taker.side]) {
            if (taker.side === BID && taker.price.gte(maker.price) ||
                taker.side === ASK && taker.price.lte(maker.price)) {
                const quantity = min(taker.quantity, maker.quantity);
                rawTrades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: this.now(),
                });
                this.orderbook.decQuantity(maker.side, maker.price, quantity);
                taker.quantity = taker.quantity.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(this.config.calcDollarVolume(maker.price, quantity))
                    .round(this.config.CURRENCY_DP);
            }
        }
        this.orderbook.apply();
        return [taker, rawTrades, volume, dollarVolume];
    }
    orderMakes(order) {
        const [openOrder] = this.openOrders.addOrder({
            ...order,
            id: ++this.orderCount,
        });
        return openOrder;
    }
}
export { Ordering as default, Ordering, };
//# sourceMappingURL=2-ordering.js.map
import { Pushing } from './1-pushing';
import { BID, ASK, LONG, SHORT, OPEN, CLOSE, min, clone, } from './interfaces';
import Big from 'big.js';
import { OpenOrderManager } from './manager-open-orders';
import assert from 'assert';
class Ordering extends Pushing {
    constructor(config, now) {
        super(config, now);
        this.orderCount = 0;
        this.settlementPrice = new Big(0);
        this.latestPrice = new Big(0);
        this.openOrders = new OpenOrderManager(config, () => this.settlementPrice, () => this.latestPrice);
    }
    // 由于精度原因，实际成本不一定恰好等于 order.price
    async makeLimitOrder(order) {
        this.validateOrder(order);
        const [maker, uTrades] = this.orderTakes(order);
        const openOrder = this.orderMakes(maker);
        if (uTrades.length) {
            this.pushUTrades(uTrades);
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
    updateTrades(uTrades) {
        super.updateTrades(uTrades);
        for (let uTrade of uTrades) {
            this.settlementPrice = new Big(0)
                .plus(this.settlementPrice.times(.9))
                .plus(uTrade.price.times(.1))
                .round(this.config.PRICE_DP);
            this.latestPrice = uTrade.price;
        }
    }
    orderTakes(taker) {
        taker = clone(taker);
        const noidTrades = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        for (const maker of this.orderbook[-taker.side]) {
            if (taker.side === BID && taker.price.gte(maker.price) ||
                taker.side === ASK && taker.price.lte(maker.price)) {
                const quantity = min(taker.quantity, maker.quantity);
                noidTrades.push({
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
        return [taker, noidTrades, volume, dollarVolume];
    }
    orderMakes(order) {
        const openOrder = {
            ...order,
            id: ++this.orderCount,
        };
        this.openOrders.addOrder(openOrder);
        return openOrder;
    }
}
export { Ordering as default, Ordering, };
//# sourceMappingURL=2-ordering.js.map
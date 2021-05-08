import { Pushing } from './1-pushing';
import { Side, Operation, Length, min, clone, } from './interfaces';
import Big from 'big.js';
import { OpenMakerManager } from './manager-open-makers';
import assert from 'assert';
class Ordering extends Pushing {
    constructor(config, snapshot, now) {
        super(config, now);
        this.latestPrice = new Big(0);
        this.orderCount = 0;
        this.settlementPrice = snapshot.settlementPrice;
        this.openMakers = new OpenMakerManager(config, () => this.settlementPrice, () => this.latestPrice);
    }
    makeOpenOrder(order) {
        const uTrades = this.orderTakes(order);
        this.orderMakes(order);
        if (uTrades.length) {
            this.pushUTrades(uTrades).catch(err => void this.emit('error', err));
            this.pushOrderbook().catch(err => void this.emit('error', err));
        }
        return order;
    }
    async makeOrders(orders) {
        return Promise.all(orders.map(order => {
            const openOrder = {
                ...order,
                id: ++this.orderCount,
                filled: new Big(0),
                unfilled: order.quantity,
            };
            this.validateOrder(openOrder);
            return this.makeOpenOrder(openOrder);
        }));
    }
    cancelOpenOrder(order) {
        const filled = this.openMakers.get(order.id)?.filled || order.quantity;
        this.openMakers.removeOrder(order.id);
        return {
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: order.id,
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }
    async cancelOrders(orders) {
        return Promise.all(orders.map(order => this.cancelOpenOrder(order)));
    }
    async amendOrders(amendments) {
        return Promise.all(amendments.map(amendment => {
            const { filled } = this.cancelOpenOrder(amendment);
            const openOrder = {
                price: amendment.newPrice,
                unfilled: amendment.newUnfilled,
                quantity: amendment.newUnfilled.plus(filled),
                filled,
                id: amendment.id,
                side: amendment.side,
                length: amendment.length,
                operation: amendment.operation,
            };
            this.validateOrder(openOrder);
            return this.makeOpenOrder(openOrder);
        }));
    }
    orderTakes(taker) {
        const uTrades = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        const orderbook = this.bookManager.getBook();
        for (const maker of orderbook[-taker.side])
            if ((taker.side === Side.BID && taker.price.gte(maker.price) ||
                taker.side === Side.ASK && taker.price.lte(maker.price)) && taker.unfilled.gt(0)) {
                const quantity = min(taker.unfilled, maker.quantity);
                uTrades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: this.now(),
                });
                this.bookManager.decQuantity(maker.side, maker.price, quantity);
                taker.filled = taker.filled.plus(quantity);
                taker.unfilled = taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(this.config.calcDollarVolume(maker.price, quantity))
                    .round(this.config.CURRENCY_DP);
            }
        this.bookManager.apply();
        return uTrades;
    }
    orderMakes(openOrder) {
        const openMaker = {
            price: openOrder.price,
            quantity: openOrder.quantity,
            side: openOrder.side,
            length: openOrder.length,
            operation: openOrder.operation,
            filled: openOrder.filled,
            unfilled: openOrder.unfilled,
            id: openOrder.id,
            behind: new Big(0),
        };
        const orderbook = this.bookManager.getBook();
        for (const maker of orderbook[openOrder.side])
            if (maker.price.eq(openOrder.price))
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        this.openMakers.addOrder(openMaker);
    }
    async getOpenOrders() {
        return clone([...this.openMakers.values()]);
    }
    formatCorrect(order) {
        assert(order.price.eq(order.price.round(this.config.PRICE_DP)));
        assert(order.price.mod(this.config.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.config.QUANTITY_DP)));
        assert(order.length === Length.LONG || order.length === Length.SHORT);
        assert(order.operation === Operation.OPEN || order.operation === Operation.CLOSE);
        assert(order.operation * order.length === order.side);
    }
    validateOrder(order) {
        this.formatCorrect(order);
    }
    /** @override */
    updateTrades(uTrades) {
        this.pushUTrades(uTrades).catch(err => void this.emit('error', err));
        for (let uTrade of uTrades) {
            this.settlementPrice = new Big(0)
                .plus(this.settlementPrice.times(.9))
                .plus(uTrade.price.times(.1))
                .round(this.config.PRICE_DP);
            this.latestPrice = uTrade.price;
        }
    }
}
export { Ordering as default, Ordering, };
//# sourceMappingURL=2-ordering.js.map
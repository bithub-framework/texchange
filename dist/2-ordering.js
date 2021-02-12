import { Pushing } from './1-pushing';
import { BID, ASK, LONG, SHORT, OPEN, CLOSE, min, clone, } from './interfaces';
import Big from 'big.js';
import { OpenMakerManager } from './manager-open-makers';
import assert from 'assert';
class Ordering extends Pushing {
    constructor(config, now) {
        super(config, now);
        this.latestPrice = new Big(0);
        this.orderCount = 0;
        this.settlementPrice = config.initialSettlementPrice;
        this.openMakers = new OpenMakerManager(config, () => this.settlementPrice, () => this.latestPrice);
    }
    makeOpenOrder(order) {
        this.validateOrder(order);
        const [uTrades] = this.orderTakes(order);
        this.orderMakes(order);
        if (uTrades.length) {
            this.pushUTrades(uTrades).catch(err => void this.emit('error', err));
            this.pushOrderbook().catch(err => void this.emit('error', err));
        }
        return order;
    }
    makeLimitOrderSync(order) {
        const openOrder = {
            ...order,
            id: ++this.orderCount,
            filled: new Big(0),
            unfilled: order.quantity,
        };
        return this.makeOpenOrder(openOrder);
    }
    cancelOrderSync(order) {
        const filled = this.openMakers.get(order.id)?.filled || order.quantity;
        this.openMakers.removeOrder(order.id);
        return {
            ...order,
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }
    amendLimitOrderSync(amendment) {
        const { filled } = this.cancelOrderSync(amendment);
        const openOrder = {
            ...amendment,
            price: amendment.newPrice,
            unfilled: amendment.newUnfilled,
            quantity: amendment.newUnfilled.plus(filled),
            filled,
        };
        return this.makeOpenOrder(openOrder);
    }
    getOpenOrdersSync() {
        return clone([...this.openMakers.values()]);
    }
    validateOrder(order) {
        assert(order.price.eq(order.price.round(this.config.PRICE_DP)));
        assert(order.price.mod(this.config.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.config.QUANTITY_DP)));
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
        const uTrades = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        for (const maker of this.orderbook[-taker.side])
            if ((taker.side === BID && taker.price.gte(maker.price) ||
                taker.side === ASK && taker.price.lte(maker.price)) && taker.unfilled.gt(0)) {
                const quantity = min(taker.unfilled, maker.quantity);
                uTrades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: this.now(),
                });
                this.orderbook.decQuantity(maker.side, maker.price, quantity);
                taker.filled = taker.filled.plus(quantity);
                taker.unfilled = taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(this.config.calcDollarVolume(maker.price, quantity))
                    .round(this.config.CURRENCY_DP);
            }
        this.orderbook.apply();
        return [uTrades, volume, dollarVolume];
    }
    orderMakes(openOrder) {
        const openMaker = {
            ...openOrder,
            behind: new Big(0),
        };
        for (const maker of this.orderbook[openOrder.side]) {
            if (openOrder.side === BID && maker.price.gte(openOrder.price) ||
                openOrder.side === ASK && maker.price.lte(openOrder.price))
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        }
        return this.openMakers.addOrder(openMaker);
    }
}
export { Ordering as default, Ordering, };
//# sourceMappingURL=2-ordering.js.map
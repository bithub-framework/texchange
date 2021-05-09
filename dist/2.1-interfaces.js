import { Texchange as Parent, } from './1-pushing';
import { clone, } from './interfaces';
import Big from 'big.js';
import { OpenMakerManager } from './manager-open-makers';
class Texchange extends Parent {
    constructor(config, snapshot, now) {
        super(config, now);
        this.latestPrice = new Big(0);
        this.orderCount = 0;
        this.settlementPrice = snapshot.settlementPrice;
        this.openMakers = new OpenMakerManager(config, () => this.settlementPrice, () => this.latestPrice);
    }
    async makeOrders(orders) {
        const results = await Promise.allSettled(orders.map(async (order) => {
            const openOrder = {
                ...order,
                id: ++this.orderCount,
                filled: new Big(0),
                unfilled: order.quantity,
            };
            this.validateOrder(openOrder);
            return this.makeOpenOrder(openOrder);
        }));
        return results.map(result => {
            return result.status === 'fulfilled'
                ? result.value
                : result.reason;
        });
    }
    async cancelOrders(orders) {
        return orders.map(order => this.cancelOpenOrder(order));
    }
    async amendOrders(amendments) {
        const results = await Promise.allSettled(amendments.map(async (amendment) => {
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
        return results.map(result => {
            return result.status === 'fulfilled'
                ? result.value
                : result.reason;
        });
    }
    async getOpenOrders() {
        return clone([...this.openMakers.values()]);
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
export { Texchange, };
//# sourceMappingURL=2.1-interfaces.js.map
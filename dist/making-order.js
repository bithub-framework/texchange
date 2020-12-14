import { Pushing } from './pushing';
import { BID, ASK, } from './interfaces';
import { EPSILON, } from './config';
class MakingOrder extends Pushing {
    constructor() {
        super(...arguments);
        this.orderCount = 0;
        this.openOrders = new Map();
    }
    async makeLimitOrder(order) {
        const [makerOrder, rawTrades,] = this.orderTakes(order);
        const openOrder = this.orderMakes(makerOrder);
        this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }
    async cancelOrder(oid) {
        this.openOrders.delete(oid);
    }
    rawTradeTakes(_rawTrade) {
        const rawTrade = { ..._rawTrade };
        for (const [oid, order] of this.openOrders)
            if (order.side !== rawTrade.side &&
                (order.side - rawTrade.side) * (order.price - rawTrade.price)
                    > EPSILON)
                if (rawTrade.quantity > order.quantity - EPSILON) {
                    rawTrade.quantity -= order.quantity;
                    this.openOrders.delete(oid);
                }
                else {
                    rawTrade.quantity = 0;
                    order.quantity -= rawTrade.quantity;
                }
    }
    updateTrades(rawTrades) {
        for (let rawTrade of rawTrades)
            this.rawTradeTakes(rawTrade);
        super.updateTrades(rawTrades);
    }
    orderTakes(order) {
        const taker = { ...order };
        const rawTrades = [];
        let volume = 0;
        let dollarVolume = 0;
        for (const [price, quantity] of this.incBook.getQuantity(~taker.side)) {
            const maker = {
                side: ~taker.side,
                price,
                quantity,
            };
            if ((taker.side === BID &&
                taker.price > maker.price - EPSILON) || (taker.side === ASK &&
                taker.price < maker.price + EPSILON)) {
                const quantity = Math.min(taker.quantity, maker.quantity);
                rawTrades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: this.now(),
                });
                this.incBook.incQuantity(maker.side, maker.price, -quantity);
                taker.quantity -= quantity;
                volume += quantity;
                dollarVolume += quantity * maker.price;
            }
        }
        this.incBook.apply();
        return [
            taker,
            rawTrades,
            volume,
            dollarVolume
        ];
    }
    orderMakes(order) {
        const openOrder = {
            side: order.side,
            price: order.price,
            quantity: order.quantity,
            id: ++this.orderCount,
        };
        if (openOrder.quantity > EPSILON)
            this.openOrders.set(openOrder.id, openOrder);
        return openOrder;
    }
}
export { MakingOrder as default, MakingOrder, };
//# sourceMappingURL=making-order.js.map
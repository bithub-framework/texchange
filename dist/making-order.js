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
    async getOpenOrders() {
        return [...this.openOrders.values()];
    }
    rawTradeShouldTakeOpenOrder(rawTrade, maker) {
        return maker.side !== rawTrade.side &&
            (maker.side - rawTrade.side) * (maker.price - rawTrade.price)
                > EPSILON;
    }
    rawTradeTakesOpenOrder(rawTrade, maker) {
        let volume;
        if (rawTrade.quantity > maker.quantity - EPSILON) {
            volume = maker.quantity;
            rawTrade.quantity -= maker.quantity;
            this.openOrders.delete(maker.id);
        }
        else {
            volume = rawTrade.quantity;
            maker.quantity -= rawTrade.quantity;
            rawTrade.quantity = 0;
        }
        return volume;
    }
    rawTradeTakesOpenOrders(_rawTrade) {
        const rawTrade = { ..._rawTrade };
        for (const order of this.openOrders.values())
            if (this.rawTradeShouldTakeOpenOrder(rawTrade, order))
                this.rawTradeTakesOpenOrder(rawTrade, order);
    }
    updateTrades(rawTrades) {
        for (let rawTrade of rawTrades)
            this.rawTradeTakesOpenOrders(rawTrade);
        super.updateTrades(rawTrades);
    }
    orderTakes(order) {
        const taker = { ...order };
        const rawTrades = [];
        let volume = 0;
        let dollarVolume = 0;
        for (const [price, quantity] of this.incBook.getQuantity(1 - taker.side)) {
            const maker = {
                side: 1 - taker.side,
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
            open: order.open,
            id: ++this.orderCount,
        };
        if (openOrder.quantity > EPSILON)
            this.openOrders.set(openOrder.id, openOrder);
        return openOrder;
    }
}
export { MakingOrder as default, MakingOrder, };
//# sourceMappingURL=making-order.js.map
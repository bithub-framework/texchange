import { Pushing } from './pushing';
import { BID, ASK, round, } from './interfaces';
import { EPSILON, QUANTITY_PRECISION, PRICE_PRECISION, } from './config';
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
        return ((maker.side === BID &&
            rawTrade.side === ASK &&
            maker.price > rawTrade.price + EPSILON) || (maker.side === ASK &&
            rawTrade.side === BID &&
            rawTrade.price > maker.price + EPSILON));
    }
    rawTradeTakesOpenOrder(rawTrade, maker) {
        let volume;
        let dollarVolume;
        if (rawTrade.quantity > maker.quantity - EPSILON) {
            volume = maker.quantity;
            dollarVolume = maker.quantity * maker.price;
            rawTrade.quantity = round(rawTrade.quantity - maker.quantity, QUANTITY_PRECISION);
            this.openOrders.delete(maker.id);
        }
        else {
            volume = rawTrade.quantity;
            dollarVolume = rawTrade.quantity * maker.price;
            maker.quantity = round(maker.quantity - rawTrade.quantity, QUANTITY_PRECISION);
            rawTrade.quantity = 0;
        }
        return [volume, dollarVolume];
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
    orderTakes(_taker) {
        const taker = { ..._taker };
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
                taker.quantity = round(taker.quantity - quantity, QUANTITY_PRECISION);
                volume = round(volume + quantity, QUANTITY_PRECISION);
                dollarVolume = round(dollarVolume + quantity * maker.price, PRICE_PRECISION * QUANTITY_PRECISION);
            }
        }
        this.incBook.apply();
        return [
            taker,
            rawTrades,
            volume,
            dollarVolume,
        ];
    }
    orderMakes(order) {
        const openOrder = {
            ...order,
            id: ++this.orderCount,
        };
        if (openOrder.quantity > EPSILON)
            this.openOrders.set(openOrder.id, openOrder);
        return openOrder;
    }
}
export { MakingOrder as default, MakingOrder, };
//# sourceMappingURL=making-order.js.map
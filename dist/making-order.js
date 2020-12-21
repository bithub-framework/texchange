import { Pushing } from './pushing';
import { BID, ASK, } from './interfaces';
import { DOLLAR_DP, } from './config';
import { Big, } from 'big.js';
function min(a, b) {
    return a.lt(b) ? a : b;
}
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
            maker.price.gt(rawTrade.price)) || (maker.side === ASK &&
            rawTrade.side === BID &&
            maker.price.lt(rawTrade.price)));
    }
    rawTradeTakesOpenOrder(rawTrade, maker) {
        let volume;
        let dollarVolume;
        if (rawTrade.quantity.gte(maker.quantity)) {
            volume = maker.quantity;
            dollarVolume = maker.quantity.times(maker.price)
                .round(DOLLAR_DP, 3 /* RoundUp */);
            rawTrade.quantity = rawTrade.quantity.minus(maker.quantity);
            this.openOrders.delete(maker.id);
        }
        else {
            volume = rawTrade.quantity;
            dollarVolume = rawTrade.quantity.times(maker.price)
                // TODO
                .round(DOLLAR_DP, 3 /* RoundUp */);
            maker.quantity = maker.quantity.minus(rawTrade.quantity);
            rawTrade.quantity = new Big(0);
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
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        for (const [_price, quantity] of this.incBook.getQuantity(1 - taker.side)) {
            const maker = {
                side: 1 - taker.side,
                price: new Big(_price),
                quantity,
            };
            if ((taker.side === BID &&
                taker.price.gte(maker.price)) || (taker.side === ASK &&
                taker.price.lte(maker.price))) {
                const quantity = min(taker.quantity, maker.quantity);
                rawTrades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: this.now(),
                });
                this.incBook.decQuantity(maker.side, maker.price, quantity);
                taker.quantity = taker.quantity.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume.plus(quantity.times(maker.price))
                    .round(DOLLAR_DP);
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
            frozen: new Big(0),
        };
        if (openOrder.quantity.gt(0))
            this.openOrders.set(openOrder.id, openOrder);
        return openOrder;
    }
}
export { MakingOrder as default, MakingOrder, };
//# sourceMappingURL=making-order.js.map
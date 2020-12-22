import { Pushing } from './pushing';
import { BID, ASK, min, } from './interfaces';
import { DOLLAR_DP, } from './config';
import Big from 'big.js';
class MakingOrder extends Pushing {
    constructor() {
        super(...arguments);
        this.orderCount = 0;
        this.openOrders = new Map();
    }
    // 由于精度原因，实际成本不一定恰好等于 order.price
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
            rawTrade.price.lt(maker.price)) || (maker.side === ASK &&
            rawTrade.side === BID &&
            rawTrade.price.gt(maker.price)));
    }
    rawTradeTakesOpenOrder(rawTrade, maker) {
        const volume = min(rawTrade.quantity, maker.quantity);
        const dollarVolume = maker.price.times(volume)
            .round(DOLLAR_DP);
        rawTrade.quantity = rawTrade.quantity.minus(volume);
        maker.quantity = maker.quantity.minus(volume);
        if (maker.quantity.eq(0))
            this.openOrders.delete(maker.id);
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
        for (const [_price, quantity] of this.incBook.getQuantity(-taker.side)) {
            const maker = {
                side: -taker.side,
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
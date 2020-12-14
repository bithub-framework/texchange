import { Pushing } from './pushing';
import {
    OpenOrder,
    LimitOrder,
    BID, ASK,
    OrderId,
    MakerOrder,
    RawTrade,
} from './interfaces';
import {
    EPSILON,
} from './config';

class MakingOrder extends Pushing {
    private orderCount = 0;
    private openOrders = new Map<OrderId, OpenOrder>();

    public async makeLimitOrder(order: LimitOrder): Promise<OrderId> {
        const [
            makerOrder,
            rawTrades,
        ] = this.orderTakes(order);
        const openOrder = this.orderMakes(makerOrder);
        this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        this.openOrders.delete(oid);
    }

    protected rawTradeTakes(_rawTrade: RawTrade) {
        const rawTrade: RawTrade = { ..._rawTrade };
        for (const [oid, order] of this.openOrders)
            if (
                order.side !== rawTrade.side &&
                (order.side - rawTrade.side) * (order.price - rawTrade.price)
                > EPSILON
            )
                if (rawTrade.quantity > order.quantity - EPSILON) {
                    rawTrade.quantity -= order.quantity;
                    this.openOrders.delete(oid);
                } else {
                    rawTrade.quantity = 0;
                    order.quantity -= rawTrade.quantity;
                }
    }

    public updateTrades(rawTrades: RawTrade[]): void {
        for (let rawTrade of rawTrades)
            this.rawTradeTakes(rawTrade);
        super.updateTrades(rawTrades);
    }

    protected orderTakes(order: LimitOrder): [
        MakerOrder,
        RawTrade[],
        number,
        number,
    ] {
        const taker: LimitOrder = { ...order };
        const rawTrades: RawTrade[] = [];
        let volume = 0;
        let dollarVolume = 0;
        for (const [price, quantity] of this.incBook.getQuantity(~taker.side)) {
            const maker: MakerOrder = {
                side: ~taker.side,
                price,
                quantity,
            };
            if (
                (
                    taker.side === BID &&
                    taker.price > maker.price - EPSILON
                ) || (
                    taker.side === ASK &&
                    taker.price < maker.price + EPSILON
                )
            ) {
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

    protected orderMakes(order: MakerOrder): OpenOrder {
        const openOrder: OpenOrder = {
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

export {
    MakingOrder as default,
    MakingOrder,
}

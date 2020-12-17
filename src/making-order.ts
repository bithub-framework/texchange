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
    protected openOrders = new Map<OrderId, OpenOrder>();

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

    public async getOpenOrders(): Promise<OpenOrder[]> {
        return [...this.openOrders.values()];
    }

    protected rawTradeShouldTakeOpenOrder(rawTrade: RawTrade, maker: OpenOrder): boolean {
        return maker.side !== rawTrade.side &&
            (maker.side - rawTrade.side) * (maker.price - rawTrade.price)
            > EPSILON;
    }

    protected rawTradeTakesOpenOrder(rawTrade: RawTrade, maker: OpenOrder): number {
        let volume: number;
        if (rawTrade.quantity > maker.quantity - EPSILON) {
            volume = maker.quantity;
            rawTrade.quantity -= maker.quantity;
            this.openOrders.delete(maker.id);
        } else {
            volume = rawTrade.quantity;
            maker.quantity -= rawTrade.quantity;
            rawTrade.quantity = 0;
        }
        return volume;
    }

    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade) {
        const rawTrade: RawTrade = { ..._rawTrade };
        for (const order of this.openOrders.values())
            if (this.rawTradeShouldTakeOpenOrder(rawTrade, order))
                this.rawTradeTakesOpenOrder(rawTrade, order);
    }

    public updateTrades(rawTrades: RawTrade[]): void {
        for (let rawTrade of rawTrades)
            this.rawTradeTakesOpenOrders(rawTrade);
        super.updateTrades(rawTrades);
    }

    protected orderTakes(order: LimitOrder): [
        LimitOrder,
        RawTrade[],
        number,
        number,
    ] {
        const taker: LimitOrder = { ...order };
        const rawTrades: RawTrade[] = [];
        let volume = 0;
        let dollarVolume = 0;
        for (const [price, quantity] of this.incBook.getQuantity(1 - taker.side)) {
            const maker: MakerOrder = {
                side: 1 - taker.side,
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

    protected orderMakes(order: LimitOrder): OpenOrder {
        const openOrder: OpenOrder = {
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

export {
    MakingOrder as default,
    MakingOrder,
}

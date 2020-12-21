import { Pushing } from './pushing';
import {
    OpenOrder,
    LimitOrder,
    BID, ASK,
    OrderId,
    MakerOrder,
    RawTrade,
    round,
} from './interfaces';
import {
    EPSILON,
    QUANTITY_PRECISION,
    DOLLAR_PRECISION,
} from './config';

class MakingOrder extends Pushing {
    protected orderCount = 0;
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
        return (
            (
                maker.side === BID &&
                rawTrade.side === ASK &&
                maker.price > rawTrade.price + EPSILON
            ) || (
                maker.side === ASK &&
                rawTrade.side === BID &&
                rawTrade.price > maker.price + EPSILON
            )
        );
    }

    protected rawTradeTakesOpenOrder(
        rawTrade: RawTrade,
        maker: OpenOrder,
    ): [number, number] {
        let volume: number;
        let dollarVolume: number;
        if (rawTrade.quantity > maker.quantity - EPSILON) {
            volume = maker.quantity;
            dollarVolume = maker.quantity * maker.price;
            rawTrade.quantity = round(
                rawTrade.quantity - maker.quantity,
                QUANTITY_PRECISION,
            );
            this.openOrders.delete(maker.id);
        } else {
            volume = rawTrade.quantity;
            dollarVolume = round(
                // non precision reason
                rawTrade.quantity * maker.price,
                DOLLAR_PRECISION,
            );
            maker.quantity = round(
                maker.quantity - rawTrade.quantity,
                QUANTITY_PRECISION,
            );
            rawTrade.quantity = 0;
        }
        return [volume, dollarVolume];
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

    protected orderTakes(_taker: LimitOrder): [
        LimitOrder,
        RawTrade[],
        number,
        number,
    ] {
        const taker: LimitOrder = { ..._taker };
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
                taker.quantity = round(
                    taker.quantity - quantity,
                    QUANTITY_PRECISION,
                );
                volume = round(
                    volume + quantity,
                    QUANTITY_PRECISION,
                );
                dollarVolume = round(
                    // non precision reason
                    dollarVolume + quantity * maker.price,
                    DOLLAR_PRECISION,
                );
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

    protected orderMakes(
        order: LimitOrder,
    ): OpenOrder {
        const openOrder: OpenOrder = {
            ...order,
            id: ++this.orderCount,
            frozen: 0,
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

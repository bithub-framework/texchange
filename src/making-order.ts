import { Pushing } from './pushing';
import {
    OpenOrder,
    LimitOrder,
    BID, ASK,
    OrderId,
    MakerOrder,
    RawTrade,
    min,
} from './interfaces';
import Big from 'big.js';

class MakingOrder extends Pushing {
    protected orderCount = 0;
    protected openOrders = new Map<OrderId, OpenOrder>();

    // 由于精度原因，实际成本不一定恰好等于 order.price
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
                rawTrade.price.lt(maker.price)
            ) || (
                maker.side === ASK &&
                rawTrade.side === BID &&
                rawTrade.price.gt(maker.price)
            )
        );
    }

    protected rawTradeTakesOpenOrder(
        rawTrade: RawTrade,
        maker: OpenOrder,
    ): [Big, Big] {
        const volume = min(rawTrade.quantity, maker.quantity);
        const dollarVolume = maker.price.times(volume)
            .round(this.config.CURRENCY_DP);
        rawTrade.quantity = rawTrade.quantity.minus(volume);
        maker.quantity = maker.quantity.minus(volume);
        if (maker.quantity.eq(0)) this.openOrders.delete(maker.id);
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
        Big,
        Big,
    ] {
        const taker: LimitOrder = { ..._taker };
        const rawTrades: RawTrade[] = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        for (const [_price, quantity] of this.incBook.getQuantity(-taker.side)) {
            const maker: MakerOrder = {
                side: -taker.side,
                price: new Big(_price),
                quantity,
            };
            if (
                (
                    taker.side === BID &&
                    taker.price.gte(maker.price)
                ) || (
                    taker.side === ASK &&
                    taker.price.lte(maker.price)
                )
            ) {
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
                    .round(this.config.CURRENCY_DP);
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
            frozen: new Big(0),
        };
        if (openOrder.quantity.gt(0))
            this.openOrders.set(openOrder.id, openOrder);
        return openOrder;
    }
}

export {
    MakingOrder as default,
    MakingOrder,
}

import { Pushing } from './1-pushing';
import {
    OpenOrder,
    LimitOrder,
    BID, ASK, Side,
    OrderId,
    RawTrade,
    min,
    Config,
} from './interfaces';
import Big from 'big.js';
import { OpenOrderManager } from './open-order-manager';

class Ordering extends Pushing {
    protected orderCount = 0;
    protected openOrders: OpenOrderManager;

    constructor(
        config: Config,
        now: () => number,
    ) {
        super(config, now);
        this.openOrders = new OpenOrderManager(config);
    }

    // 由于精度原因，实际成本不一定恰好等于 order.price
    public async makeLimitOrder(order: LimitOrder): Promise<OrderId> {
        const [makerOrder, rawTrades] = this.orderTakes(order);
        const openOrder = this.orderMakes(makerOrder);
        if (rawTrades.length) this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        this.openOrders.removeOrder(oid);
    }

    public async getOpenOrders(): Promise<OpenOrder[]> {
        return [...this.openOrders.values()];
    }

    protected orderTakes(_taker: LimitOrder): [
        LimitOrder, RawTrade[], Big, Big,
    ] {
        const taker = { ..._taker };
        const rawTrades: RawTrade[] = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        for (const maker of this.orderbook[<Side>(-taker.side)]) {
            if (
                taker.side === BID && taker.price.gte(maker.price) ||
                taker.side === ASK && taker.price.lte(maker.price)
            ) {
                const quantity = min(taker.quantity, maker.quantity);
                rawTrades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: this.now(),
                });
                this.orderbook.decQuantity(maker.side, maker.price, quantity);
                taker.quantity = taker.quantity.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(this.config.calcDollarVolume(maker.price, quantity))
                    .round(this.config.CURRENCY_DP);
            }
        }
        return [taker, rawTrades, volume, dollarVolume];
    }

    protected orderMakes(
        order: LimitOrder,
    ): OpenOrder {
        const [openOrder] = this.openOrders.addOrder({
            ...order,
            id: ++this.orderCount,
        });
        return openOrder;
    }
}

export {
    Ordering as default,
    Ordering,
}

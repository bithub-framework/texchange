import { Pushing } from './1-pushing';
import {
    OpenOrder,
    LimitOrder,
    BID, ASK,
    LONG, SHORT,
    OPEN, CLOSE,
    OrderId,
    RawTrade,
    min,
    Config,
    clone,
} from './interfaces';
import Big from 'big.js';
import { OpenOrderManager } from './manager-open-order';
import assert from 'assert';

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
        this.validateOrder(order);
        const [makerOrder, rawTrades] = this.orderTakes(order);
        const openOrder = this.orderMakes(makerOrder);
        if (rawTrades.length) {
            this.pushRawTrades(rawTrades);
            this.pushOrderbook();
        }
        return openOrder.id;
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        this.openOrders.removeOrder(oid);
    }

    public async getOpenOrders(): Promise<OpenOrder[]> {
        return [...this.openOrders.values()];
    }

    protected validateOrder(order: LimitOrder) {
        assert(order.price.eq(order.price.round(this.config.PRICE_DP)));
        assert(order.quantity.gt(0));
        assert(order.quantity.eq(order.quantity.round(this.config.QUANTITY_DP)));
        assert(order.length === LONG || order.length === SHORT);
        assert(order.operation === OPEN || order.operation === CLOSE);
        assert(order.operation * order.length === order.side);
    }

    protected orderTakes(taker: LimitOrder): [
        LimitOrder, RawTrade[], Big, Big,
    ] {
        taker = clone(taker);
        const rawTrades: RawTrade[] = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        for (const maker of this.orderbook[-taker.side]) {
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
        this.orderbook.apply();
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

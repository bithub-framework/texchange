import { Pushing } from './1-pushing';
import {
    OpenOrder,
    LimitOrder,
    BID, ASK,
    LONG, SHORT,
    OPEN, CLOSE,
    OrderId,
    UnidentifiedTrade,
    min,
    Config,
    clone,
} from './interfaces';
import Big from 'big.js';
import { OpenOrderManager } from './manager-open-orders';
import assert from 'assert';

class Ordering extends Pushing {
    protected orderCount = 0;
    protected openOrders: OpenOrderManager;
    protected settlementPrice = new Big(0);
    protected latestPrice = new Big(0);

    constructor(
        config: Config,
        now: () => number,
    ) {
        super(config, now);
        this.openOrders = new OpenOrderManager(
            config,
            () => this.settlementPrice,
            () => this.latestPrice,
        );
    }

    // 由于精度原因，实际成本不一定恰好等于 order.price
    public async makeLimitOrder(order: LimitOrder): Promise<OrderId> {
        this.validateOrder(order);
        const [maker, uTrades] = this.orderTakes(order);
        const openOrder = this.orderMakes(maker);
        if (uTrades.length) {
            this.pushUTrades(uTrades);
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

    public updateTrades(uTrades: UnidentifiedTrade[]): void {
        super.updateTrades(uTrades);
        for (let uTrade of uTrades) {
            this.settlementPrice = new Big(0)
                .plus(this.settlementPrice.times(.9))
                .plus(uTrade.price.times(.1))
                .round(this.config.PRICE_DP);
            this.latestPrice = uTrade.price;
        }
    }

    protected orderTakes(taker: LimitOrder): [
        LimitOrder, UnidentifiedTrade[], Big, Big,
    ] {
        taker = clone(taker);
        const noidTrades: UnidentifiedTrade[] = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        for (const maker of this.orderbook[-taker.side]) {
            if (
                taker.side === BID && taker.price.gte(maker.price) ||
                taker.side === ASK && taker.price.lte(maker.price)
            ) {
                const quantity = min(taker.quantity, maker.quantity);
                noidTrades.push({
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
        return [taker, noidTrades, volume, dollarVolume];
    }

    protected orderMakes(
        order: LimitOrder,
    ): OpenOrder {
        const openOrder: OpenOrder = {
            ...order,
            id: ++this.orderCount,
        };
        this.openOrders.addOrder(openOrder);
        return openOrder;
    }
}

export {
    Ordering as default,
    Ordering,
}

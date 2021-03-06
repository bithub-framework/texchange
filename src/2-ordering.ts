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
    OpenMaker,
    LimitOrderAmendment,
} from './interfaces';
import Big from 'big.js';
import { OpenOrderManager } from './manager-open-orders';
import assert from 'assert';

abstract class Ordering extends Pushing {
    protected openOrders: OpenOrderManager;
    protected settlementPrice: Big;
    protected latestPrice = new Big(0);
    protected orderCount = 0;

    constructor(
        config: Config,
        now: () => number,
    ) {
        super(config, now);
        this.settlementPrice = config.initialSettlementPrice;
        this.openOrders = new OpenOrderManager(
            config,
            () => this.settlementPrice,
            () => this.latestPrice,
        );
    }

    protected makeLimitOrderSync(
        order: LimitOrder,
        oid?: number,
    ): OrderId {
        this.validateOrder(order);
        const openOrder: OpenOrder = {
            ...order,
            id: oid || ++this.orderCount,
        };
        const [uTrades] = this.orderTakes(openOrder);
        this.orderMakes(openOrder);
        if (uTrades.length) {
            this.pushUTrades(uTrades).catch(err => void this.emit('error', err));
            this.pushOrderbook().catch(err => void this.emit('error', err));
        }
        return openOrder.id;
    }

    protected amendLimitOrderSync(
        amendment: LimitOrderAmendment,
    ): Big {
        const unfilled = this.cancelOrderSync(amendment.id);
        this.makeLimitOrderSync(amendment, <number>amendment.id);
        return unfilled;
    }

    protected cancelOrderSync(oid: OrderId): Big {
        const order = this.openOrders.get(oid);
        this.openOrders.removeOrder(oid);
        return order ? order.quantity : new Big(0);
    }

    protected getOpenOrdersSync(): OpenOrder[] {
        return clone([...this.openOrders.values()]);
    }

    protected validateOrder(order: LimitOrder) {
        assert(order.price.eq(order.price.round(this.config.PRICE_DP)));
        assert(order.price.mod(this.config.TICK_SIZE).eq(0));
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

    protected orderTakes(taker: OpenOrder) {
        const uTrades: UnidentifiedTrade[] = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        for (const maker of this.orderbook[-taker.side])
            if (
                (
                    taker.side === BID && taker.price.gte(maker.price) ||
                    taker.side === ASK && taker.price.lte(maker.price)
                ) && taker.quantity.gt(0)
            ) {
                const quantity = min(taker.quantity, maker.quantity);
                uTrades.push({
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
        this.orderbook.apply();
        return [uTrades, volume, dollarVolume] as const;
    }

    protected orderMakes(
        openOrder: OpenOrder,
    ) {
        const openMaker: OpenMaker = {
            ...openOrder,
            behind: new Big(0),
        };
        for (const maker of this.orderbook[openOrder.side]) {
            if (
                openOrder.side === BID && maker.price.gte(openOrder.price) ||
                openOrder.side === ASK && maker.price.lte(openOrder.price)
            ) openMaker.behind = openMaker.behind.plus(maker.quantity);
        }
        return this.openOrders.addOrder(openMaker);
    }
}

export {
    Ordering as default,
    Ordering,
}

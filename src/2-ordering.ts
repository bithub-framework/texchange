import { Pushing, PushingEvents } from './1-pushing';
import {
    OpenOrder,
    LimitOrder,
    Side, Operation, Length,
    UnidentifiedTrade,
    min,
    Config,
    clone,
    OpenMaker,
    Amendment,
    Snapshot,
} from './interfaces';
import Big from 'big.js';
import { OpenMakerManager } from './manager-open-makers';
import assert from 'assert';

abstract class Ordering extends Pushing {
    protected openMakers: OpenMakerManager;
    protected settlementPrice: Big;
    protected latestPrice = new Big(0);
    protected orderCount = 0;

    constructor(
        config: Config,
        snapshot: Snapshot,
        now: () => number,
    ) {
        super(config, now);
        this.settlementPrice = snapshot.settlementPrice;
        this.openMakers = new OpenMakerManager(
            config,
            () => this.settlementPrice,
            () => this.latestPrice,
        );
    }

    protected makeOpenOrder(order: OpenOrder): OpenOrder {
        this.validateOrder(order);
        const [uTrades] = this.orderTakes(order);
        this.orderMakes(order);
        if (uTrades.length) {
            this.pushUTrades(uTrades).catch(err => void this.emit('error', err));
            this.pushOrderbook().catch(err => void this.emit('error', err));
        }
        return order;
    }

    protected makeOrder(order: LimitOrder): OpenOrder {
        const openOrder: OpenOrder = {
            ...order,
            id: ++this.orderCount,
            filled: new Big(0),
            unfilled: order.quantity,
        };
        return this.makeOpenOrder(openOrder);
    }

    protected cancelOrder(order: OpenOrder): OpenOrder {
        const filled = this.openMakers.get(order.id)?.filled || order.quantity;
        this.openMakers.removeOrder(order.id);
        return {
            ...order,
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }

    protected amendOrder(
        amendment: Amendment,
    ): OpenOrder {
        const { filled } = this.cancelOrder(amendment);
        const openOrder: OpenOrder = {
            price: amendment.newPrice,
            unfilled: amendment.newUnfilled,
            quantity: amendment.newUnfilled.plus(filled),
            filled,
            id: amendment.id,
            side: amendment.side,
            length: amendment.length,
            operation: amendment.operation,
        };
        return this.makeOpenOrder(openOrder);
    }

    protected getOpenOrders(): OpenOrder[] {
        return clone([...this.openMakers.values()]);
    }

    protected validateOrder(order: OpenOrder) {
        assert(order.price.eq(order.price.round(this.config.PRICE_DP)));
        assert(order.price.mod(this.config.TICK_SIZE).eq(0));
        assert(order.unfilled.gt(0));
        assert(order.unfilled.eq(order.unfilled.round(this.config.QUANTITY_DP)));
        assert(order.length === Length.LONG || order.length === Length.SHORT);
        assert(order.operation === Operation.OPEN || order.operation === Operation.CLOSE);
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
        const orderbook = this.bookManager.getBook();
        for (const maker of orderbook[-taker.side])
            if (
                (
                    taker.side === Side.BID && taker.price.gte(maker.price) ||
                    taker.side === Side.ASK && taker.price.lte(maker.price)
                ) && taker.unfilled.gt(0)
            ) {
                const quantity = min(taker.unfilled, maker.quantity);
                uTrades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: this.now(),
                });
                this.bookManager.decQuantity(maker.side, maker.price, quantity);
                taker.filled = taker.filled.plus(quantity);
                taker.unfilled = taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(this.config.calcDollarVolume(maker.price, quantity))
                    .round(this.config.CURRENCY_DP);
            }
        this.bookManager.apply();
        return [uTrades, volume, dollarVolume] as const;
    }

    protected orderMakes(
        openOrder: OpenOrder,
    ) {
        const openMaker: OpenMaker = {
            price: openOrder.price,
            quantity: openOrder.quantity,
            side: openOrder.side,
            length: openOrder.length,
            operation: openOrder.operation,
            filled: openOrder.filled,
            unfilled: openOrder.unfilled,
            id: openOrder.id,
            behind: new Big(0),
        };
        const orderbook = this.bookManager.getBook();
        for (const maker of orderbook[openOrder.side])
            if (maker.price.eq(openOrder.price))
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        return this.openMakers.addOrder(openMaker);
    }
}

export {
    Ordering as default,
    Ordering,
    PushingEvents as OrderingEvents,
}

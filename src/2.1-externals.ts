import {
    Texchange as Parent,
    Events,
} from './1-pushing';
import {
    OpenOrder,
    LimitOrder,
    UnidentifiedTrade,
    Config,
    clone,
    Amendment,
    Snapshot,
} from './interfaces';
import Big from 'big.js';
import { OpenMakerManager } from './manager-open-makers';

abstract class Texchange extends Parent {
    protected openMakers: OpenMakerManager;
    protected settlementPrice: Big;
    protected latestPrice = new Big(0);
    protected orderCount = 0;

    protected abstract validateOrder(order: OpenOrder): void;
    protected abstract makeOpenOrder(order: OpenOrder): OpenOrder;
    protected abstract cancelOpenOrder(order: OpenOrder): OpenOrder;

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

    public async makeOrders(orders: LimitOrder[]): Promise<(OpenOrder | Error)[]> {
        const results = await Promise.allSettled(orders.map(order => {
            const openOrder: OpenOrder = {
                ...order,
                id: ++this.orderCount,
                filled: new Big(0),
                unfilled: order.quantity,
            };
            this.validateOrder(openOrder);
            return this.makeOpenOrder(openOrder);
        }));
        return results.map(result => {
            return result.status === 'fulfilled'
                ? result.value
                : <Error>result.reason;
        });
    }

    public async cancelOrders(orders: OpenOrder[]): Promise<(OpenOrder | Error)[]> {
        const results = await Promise.allSettled(
            orders.map(order => this.cancelOpenOrder(order))
        );
        return results.map(result => {
            return result.status === 'fulfilled'
                ? result.value
                : <Error>result.reason;
        });
    }

    public async amendOrders(amendments: Amendment[]): Promise<(OpenOrder | Error)[]> {
        const results = await Promise.allSettled(amendments.map(amendment => {
            const { filled } = this.cancelOpenOrder(amendment);
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
            this.validateOrder(openOrder);
            return this.makeOpenOrder(openOrder);
        }));
        return results.map(result => {
            return result.status === 'fulfilled'
                ? result.value
                : <Error>result.reason;
        });
    }

    public async getOpenOrders(): Promise<OpenOrder[]> {
        return clone([...this.openMakers.values()]);
    }

    /** @override */
    public updateTrades(uTrades: UnidentifiedTrade[]): void {
        this.pushUTrades(uTrades).catch(err => void this.emit('error', err));
        for (let uTrade of uTrades) {
            this.settlementPrice = new Big(0)
                .plus(this.settlementPrice.times(.9))
                .plus(uTrade.price.times(.1))
                .round(this.config.PRICE_DP);
            this.latestPrice = uTrade.price;
        }
    }
}

export {
    Texchange,
    Events,
}

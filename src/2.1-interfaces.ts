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
} from './interfaces';
import Big from 'big.js';
import assert = require('assert');
import { OpenMakerManager } from './state-managers/open-maker-manager';

abstract class Texchange extends Parent {
    protected abstract makers: OpenMakerManager;
    protected settlementPrice: Big;
    protected latestPrice;
    protected orderCount = 0;

    protected abstract validateOrder(order: OpenOrder): void;
    protected abstract makeOpenOrder(order: OpenOrder): OpenOrder;
    protected abstract cancelOpenOrder(order: OpenOrder): OpenOrder;

    constructor(
        config: Config,
        now: () => number,
    ) {
        super(config, now);
        this.settlementPrice = config.initialSettlementPrice;
        this.latestPrice = config.initialLatestPrice;

    }

    public makeOrders(orders: LimitOrder[]): (OpenOrder | Error)[] {
        return orders.map((order): OpenOrder | Error => {
            try {
                const openOrder: OpenOrder = {
                    ...order,
                    id: ++this.orderCount,
                    filled: new Big(0),
                    unfilled: order.quantity,
                };
                this.validateOrder(openOrder);
                return clone(this.makeOpenOrder(openOrder));
            } catch (err) {
                return err;
            }
        });
    }

    public cancelOrders(orders: OpenOrder[]): OpenOrder[] {
        return orders.map(order => clone(this.cancelOpenOrder(order)));
    }

    public amendOrders(amendments: Amendment[]): (OpenOrder | Error)[] {
        return amendments.map((amendment): OpenOrder | Error => {
            try {
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
                return clone(this.makeOpenOrder(openOrder));
            } catch (err) {
                return err;
            }
        });
    }

    public getOpenOrders(): OpenOrder[] {
        return clone([...this.makers.values()]);
    }

    /** @override */
    public updateTrades(uTrades: UnidentifiedTrade[]): void {
        for (const uTrade of uTrades)
            assert(uTrade.time === this.now());
        this.pushUTrades(uTrades);
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

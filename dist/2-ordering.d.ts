import { Pushing } from './1-pushing';
import { OpenOrder, LimitOrder, OrderId, RawTrade, Config } from './interfaces';
import Big from 'big.js';
import { OpenOrderManager } from './open-order-manager';
declare class Ordering extends Pushing {
    protected orderCount: number;
    protected openOrderManager: OpenOrderManager;
    constructor(config: Config, now: () => number);
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    getOpenOrders(): Promise<OpenOrder[]>;
    protected orderTakes(_taker: LimitOrder): [
        LimitOrder,
        RawTrade[],
        Big,
        Big
    ];
    protected orderMakes(order: LimitOrder): OpenOrder;
}
export { Ordering as default, Ordering, };

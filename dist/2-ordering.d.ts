import { Pushing } from './1-pushing';
import { OpenOrder, LimitOrder, OrderId, RawTrade, Config } from './interfaces';
import Big from 'big.js';
import { OpenOrderManager } from './manager-open-order';
declare class Ordering extends Pushing {
    protected orderCount: number;
    protected openOrders: OpenOrderManager;
    constructor(config: Config, now: () => number);
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    getOpenOrders(): Promise<OpenOrder[]>;
    protected validateOrder(order: LimitOrder): void;
    protected orderTakes(taker: LimitOrder): [
        LimitOrder,
        RawTrade[],
        Big,
        Big
    ];
    protected orderMakes(order: LimitOrder): OpenOrder;
}
export { Ordering as default, Ordering, };

import { Pushing } from './1-pushing';
import { OpenOrder, DetailedOpenOrder, LimitOrder, OrderId, RawTrade } from './interfaces';
import Big from 'big.js';
declare class Ordering extends Pushing {
    protected orderCount: number;
    protected openOrders: Map<import("interfaces/dist/data").TradeId, DetailedOpenOrder>;
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    getOpenOrders(): Promise<OpenOrder[]>;
    protected orderTakes(_taker: LimitOrder): [
        LimitOrder,
        RawTrade[],
        Big,
        Big
    ];
    protected orderMakes(order: LimitOrder): DetailedOpenOrder;
}
export { Ordering as default, Ordering, };

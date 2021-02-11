import { Pushing } from './1-pushing';
import { OpenOrder, LimitOrder, OrderId, UnidentifiedTrade, Config, LimitOrderAmendment } from './interfaces';
import Big from 'big.js';
import { OpenOrderManager } from './manager-open-orders';
declare abstract class Ordering extends Pushing {
    protected openOrders: OpenOrderManager;
    protected settlementPrice: Big;
    protected latestPrice: Big;
    protected orderCount: number;
    constructor(config: Config, now: () => number);
    protected makeLimitOrderSync(order: LimitOrder, oid?: number): OrderId;
    protected amendLimitOrderSync(amendment: LimitOrderAmendment): Big;
    protected cancelOrderSync(oid: OrderId): Big;
    protected getOpenOrdersSync(): OpenOrder[];
    protected validateOrder(order: LimitOrder): void;
    updateTrades(uTrades: UnidentifiedTrade[]): void;
    protected orderTakes(taker: OpenOrder): readonly [Pick<import("interfaces/dist/data").Trade, "quantity" | "side" | "price" | "time">[], Big, Big];
    protected orderMakes(openOrder: OpenOrder): import("./manager-open-orders").Frozen;
}
export { Ordering as default, Ordering, };

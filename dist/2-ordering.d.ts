import { Pushing } from './1-pushing';
import { OpenOrder, LimitOrder, OrderId, UnidentifiedTrade, Config } from './interfaces';
import Big from 'big.js';
import { OpenOrderManager } from './manager-open-orders';
declare abstract class Ordering extends Pushing {
    protected orderCount: number;
    protected openOrders: OpenOrderManager;
    protected settlementPrice: Big;
    protected latestPrice: Big;
    constructor(config: Config, now: () => number);
    protected makeLimitOrderSync(order: LimitOrder): OrderId;
    protected remakeLimitOrderSync(oid: OrderId, order: LimitOrder): OrderId;
    protected cancelOrderSync(oid: OrderId): OpenOrder | null;
    protected getOpenOrdersSync(): OpenOrder[];
    protected validateOrder(order: LimitOrder): void;
    protected onlyOneOpenOrder(): void;
    updateTrades(uTrades: UnidentifiedTrade[]): void;
    protected orderTakes(taker: LimitOrder): readonly [LimitOrder, Pick<import("interfaces/dist/data").Trade, "side" | "price" | "quantity" | "time">[], Big, Big];
    protected orderMakes(order: LimitOrder): OpenOrder;
}
export { Ordering as default, Ordering, };

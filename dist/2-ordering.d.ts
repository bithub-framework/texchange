import { Pushing } from './1-pushing';
import { OpenOrder, LimitOrder, OrderId, UnidentifiedTrade, Config } from './interfaces';
import Big from 'big.js';
import { OpenOrderManager } from './manager-open-orders';
declare abstract class Ordering extends Pushing {
    protected openOrders: OpenOrderManager;
    protected settlementPrice: Big;
    protected latestPrice: Big;
    constructor(config: Config, now: () => number);
    protected makeLimitOrderSync(order: LimitOrder): Big;
    protected remakeLimitOrderSync(order: LimitOrder): [Big | null, Big];
    protected cancelOrderSync(oid: OrderId): Big | null;
    protected getOpenOrdersSync(): OpenOrder[];
    protected validateOrder(order: LimitOrder): void;
    updateTrades(uTrades: UnidentifiedTrade[]): void;
    protected orderTakes(taker: OpenOrder): readonly [Pick<import("interfaces/dist/data").Trade, "side" | "price" | "quantity" | "time">[], Big, Big];
    protected orderMakes(openOrder: OpenOrder): import("./manager-open-orders").Frozen;
}
export { Ordering as default, Ordering, };

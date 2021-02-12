import { Pushing } from './1-pushing';
import { OpenOrder, LimitOrder, UnidentifiedTrade, Config, LimitOrderAmendment } from './interfaces';
import Big from 'big.js';
import { OpenOrderManager } from './manager-open-orders';
declare abstract class Ordering extends Pushing {
    protected openOrders: OpenOrderManager;
    protected settlementPrice: Big;
    protected latestPrice: Big;
    protected orderCount: number;
    constructor(config: Config, now: () => number);
    protected makeOpenOrder(order: OpenOrder): OpenOrder;
    protected makeLimitOrderSync(order: LimitOrder): OpenOrder;
    protected cancelOrderSync(order: OpenOrder): OpenOrder;
    protected amendLimitOrderSync(amendment: LimitOrderAmendment): OpenOrder;
    protected getOpenOrdersSync(): OpenOrder[];
    protected validateOrder(order: OpenOrder): void;
    updateTrades(uTrades: UnidentifiedTrade[]): void;
    protected orderTakes(taker: OpenOrder): readonly [Pick<import("interfaces/dist/data").Trade, "side" | "price" | "quantity" | "time">[], Big, Big];
    protected orderMakes(openOrder: OpenOrder): import("./manager-open-orders").Frozen;
}
export { Ordering as default, Ordering, };

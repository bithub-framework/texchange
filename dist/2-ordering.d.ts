import { Pushing, PushingEvents } from './1-pushing';
import { OpenOrder, LimitOrder, UnidentifiedTrade, Config, LimitOrderAmendment, Snapshot } from './interfaces';
import Big from 'big.js';
import { OpenMakerManager } from './manager-open-makers';
declare class Ordering extends Pushing {
    protected openMakers: OpenMakerManager;
    protected settlementPrice: Big;
    protected latestPrice: Big;
    protected orderCount: number;
    constructor(config: Config, snapshot: Snapshot, now: () => number);
    protected makeOpenOrder(order: OpenOrder): OpenOrder;
    protected makeLimitOrderNoDelay(order: LimitOrder): OpenOrder;
    protected cancelOrderNoDelay(order: OpenOrder): OpenOrder;
    protected amendLimitOrderNoDelay(amendment: LimitOrderAmendment): OpenOrder;
    protected getOpenOrdersNoDelay(): OpenOrder[];
    protected validateOrder(order: OpenOrder): void;
    updateTrades(uTrades: UnidentifiedTrade[]): void;
    protected orderTakes(taker: OpenOrder): readonly [Pick<import("interfaces/dist/data").Trade, "side" | "price" | "quantity" | "time">[], Big, Big];
    protected orderMakes(openOrder: OpenOrder): import("./manager-open-makers").Frozen;
}
export { Ordering as default, Ordering, PushingEvents as OrderingEvents, };

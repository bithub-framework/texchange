import { Pushing, PushingEvents } from './1-pushing';
import { OpenOrder, LimitOrder, UnidentifiedTrade, Config, Amendment, Snapshot } from './interfaces';
import Big from 'big.js';
import { OpenMakerManager } from './manager-open-makers';
declare class Ordering extends Pushing {
    protected openMakers: OpenMakerManager;
    protected settlementPrice: Big;
    protected latestPrice: Big;
    protected orderCount: number;
    constructor(config: Config, snapshot: Snapshot, now: () => number);
    protected makeOpenOrder(order: OpenOrder): OpenOrder;
    protected makeOrder(order: LimitOrder): OpenOrder;
    protected cancelOrder(order: OpenOrder): OpenOrder;
    protected amendOrder(amendment: Amendment): OpenOrder;
    protected orderTakes(taker: OpenOrder): UnidentifiedTrade[];
    protected orderMakes(openOrder: OpenOrder): void;
    protected getOpenOrders(): OpenOrder[];
    protected validateOrder(order: OpenOrder): void;
    updateTrades(uTrades: UnidentifiedTrade[]): void;
}
export { Ordering as default, Ordering, PushingEvents as OrderingEvents, };

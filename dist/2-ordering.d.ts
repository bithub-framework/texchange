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
    makeOrder(order: LimitOrder): Promise<OpenOrder>;
    makeOrders(orders: LimitOrder[]): Promise<OpenOrder[]>;
    protected cancelOpenOrder(order: OpenOrder): OpenOrder;
    cancelOrder(order: OpenOrder): Promise<OpenOrder>;
    cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]>;
    amendOrder(amendment: Amendment): Promise<OpenOrder>;
    amendOrders(amendments: Amendment[]): Promise<OpenOrder[]>;
    protected orderTakes(taker: OpenOrder): UnidentifiedTrade[];
    protected orderMakes(openOrder: OpenOrder): void;
    protected getOpenOrders(): Promise<OpenOrder[]>;
    protected validateOrder(order: OpenOrder): void;
    /** @override */
    updateTrades(uTrades: UnidentifiedTrade[]): void;
}
export { Ordering as default, Ordering, PushingEvents as OrderingEvents, };

import { Texchange as Parent, Events } from './1-pushing';
import { OpenOrder, LimitOrder, UnidentifiedTrade, Config, Amendment, Snapshot } from './interfaces';
import Big from 'big.js';
import { OpenMakerManager } from './manager-open-makers';
declare abstract class Texchange extends Parent {
    protected openMakers: OpenMakerManager;
    protected settlementPrice: Big;
    protected latestPrice: Big;
    protected orderCount: number;
    protected abstract validateOrder(order: OpenOrder): void;
    protected abstract makeOpenOrder(order: OpenOrder): OpenOrder;
    protected abstract cancelOpenOrder(order: OpenOrder): OpenOrder;
    constructor(config: Config, snapshot: Snapshot, now: () => number);
    makeOrders(orders: LimitOrder[]): Promise<(OpenOrder | Error)[]>;
    cancelOrders(orders: OpenOrder[]): Promise<(OpenOrder | Error)[]>;
    amendOrders(amendments: Amendment[]): Promise<(OpenOrder | Error)[]>;
    getOpenOrders(): Promise<OpenOrder[]>;
    /** @override */
    updateTrades(uTrades: UnidentifiedTrade[]): void;
}
export { Texchange, Events, };

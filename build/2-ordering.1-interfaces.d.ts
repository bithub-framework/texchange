import { Core as Parent, Events } from './1-pushing';
import { OpenOrder, LimitOrder, UnidentifiedTrade, Config, Amendment } from './interfaces';
import Big from 'big.js';
import { OpenMakerManager } from './state-managers/open-maker-manager';
declare abstract class Core extends Parent {
    protected abstract makers: OpenMakerManager;
    markPrice: Big;
    latestPrice: Big;
    protected orderCount: number;
    protected abstract validateOrder(order: OpenOrder): void;
    protected abstract makeOpenOrder(order: OpenOrder): OpenOrder;
    protected abstract cancelOpenOrder(order: OpenOrder): OpenOrder;
    constructor(config: Config, now: () => number);
    makeOrders(orders: LimitOrder[]): (OpenOrder | Error)[];
    cancelOrders(orders: OpenOrder[]): OpenOrder[];
    amendOrders(amendments: Amendment[]): (OpenOrder | Error)[];
    getOpenOrders(): OpenOrder[];
    /** @override */
    updateTrades(uTrades: UnidentifiedTrade[]): void;
}
export { Core, Events, };

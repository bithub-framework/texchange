import { ManagingAssets } from './4-assets';
import { LimitOrder, LimitOrderAmendment, OrderId, UnidentifiedTrade, ContextMarketPublicApiLike, ContextAccountPrivateApiLike, Config, OpenOrder, Balances, Positions } from './interfaces';
import Big from 'big.js';
declare class Texchange extends ManagingAssets implements ContextMarketPublicApiLike, ContextAccountPrivateApiLike {
    private sleep;
    constructor(config: Config, sleep: (ms: number) => Promise<void>, now: () => number);
    makeLimitOrders(orders: LimitOrder[]): Promise<OrderId[]>;
    amendLimitOrders(amendments: LimitOrderAmendment[]): Promise<Big[]>;
    cancelOrders(oids: OrderId[]): Promise<Big[]>;
    getBalances(): Promise<Balances>;
    getPositions(): Promise<Positions>;
    getOpenOrders(): Promise<OpenOrder[]>;
    protected pushOrderbook(): Promise<void>;
    protected pushUTrades(uTrades: UnidentifiedTrade[]): Promise<void>;
    protected pushPositionsAndBalances(): Promise<void>;
}
export { Texchange as default, Texchange, };

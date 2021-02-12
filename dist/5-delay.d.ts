import { ManagingAssets } from './4-assets';
import { LimitOrder, LimitOrderAmendment, UnidentifiedTrade, ContextMarketPublicApiLike, ContextAccountPrivateApiLike, Config, OpenOrder, Balances, Positions } from './interfaces';
declare class Texchange extends ManagingAssets implements ContextMarketPublicApiLike, ContextAccountPrivateApiLike {
    private sleep;
    constructor(config: Config, sleep: (ms: number) => Promise<void>, now: () => number);
    makeLimitOrders(orders: LimitOrder[]): Promise<OpenOrder[]>;
    amendLimitOrders(amendments: LimitOrderAmendment[]): Promise<OpenOrder[]>;
    cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]>;
    getBalances(): Promise<Balances>;
    getPositions(): Promise<Positions>;
    getOpenOrders(): Promise<OpenOrder[]>;
    protected pushOrderbook(): Promise<void>;
    protected pushUTrades(uTrades: UnidentifiedTrade[]): Promise<void>;
    protected pushPositionsAndBalances(): Promise<void>;
}
export { Texchange as default, Texchange, };

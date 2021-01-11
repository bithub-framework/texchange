import { ManagingAssets } from './4-assets';
import { LimitOrder, OrderId, UnidentifiedTrade, ContextMarketPublicApiLike, ContextAccountPrivateApiLike, Config, OpenOrder, Balances, Positions } from './interfaces';
import Big from 'big.js';
declare class Texchange extends ManagingAssets implements ContextMarketPublicApiLike, ContextAccountPrivateApiLike {
    private sleep;
    constructor(config: Config, sleep: (ms: number) => Promise<void>, now: () => number);
    makeLimitOrders(orders: LimitOrder[]): Promise<Big[]>;
    remakeLimitOrders(orders: LimitOrder[]): Promise<[Big | null, Big][]>;
    cancelOrders(oids: OrderId[]): Promise<(Big | null)[]>;
    getBalances(): Promise<Balances>;
    getPositions(): Promise<Positions>;
    getOpenOrders(): Promise<OpenOrder[]>;
    protected pushOrderbook(): Promise<void>;
    protected pushUTrades(uTrades: UnidentifiedTrade[]): Promise<void>;
    protected pushPositionsAndBalances(): Promise<void>;
}
export { Texchange as default, Texchange, };

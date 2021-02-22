import { ManagingAssets, ManagingAssetsEvents } from './4-assets';
import { LimitOrder, Amendment, UnidentifiedTrade, ContextMarketApiLike, ContextAccountApiLike, Config, OpenOrder, Balances, Positions, Snapshot } from './interfaces';
declare class Texchange extends ManagingAssets implements ContextMarketApiLike, ContextAccountApiLike {
    private sleep;
    constructor(config: Config, snapshot: Snapshot, sleep: (ms: number) => Promise<void>, now: () => number);
    makeOrders(orders: LimitOrder[]): Promise<OpenOrder[]>;
    amendOrders(amendments: Amendment[]): Promise<OpenOrder[]>;
    cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]>;
    getBalances(): Promise<Balances>;
    getPositions(): Promise<Positions>;
    getOpenOrders(): Promise<OpenOrder[]>;
    protected pushOrderbook(): Promise<void>;
    protected pushUTrades(uTrades: UnidentifiedTrade[]): Promise<void>;
    protected pushPositionsAndBalances(): Promise<void>;
}
export { Texchange as default, Texchange, ManagingAssetsEvents as TexchangeEvents, };

import { ManagingAssets, ManagingAssetsEvents } from './4-assets';
import { LimitOrder, Amendment, UnidentifiedTrade, ExchangeLike, Config, OpenOrder, Balances, Positions, Snapshot } from './interfaces';
declare class Texchange extends ManagingAssets implements ExchangeLike {
    private sleep;
    constructor(config: Config, snapshot: Snapshot, sleep: (ms: number) => Promise<void>, now: () => number);
    makeOrders(orders: LimitOrder[]): Promise<OpenOrder[]>;
    amendOrders(amendments: Amendment[]): Promise<OpenOrder[]>;
    cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]>;
    getBalances(): Promise<Balances>;
    getPositions(): Promise<Positions>;
    getOpenOrders(): Promise<OpenOrder[]>;
    /** @override */
    protected pushOrderbook(): Promise<void>;
    /** @override */
    protected pushUTrades(uTrades: UnidentifiedTrade[]): Promise<void>;
    /** @override */
    protected pushPositionsAndBalances(): Promise<void>;
}
export { Texchange as default, Texchange, ManagingAssetsEvents as TexchangeEvents, };

import { ManagingAssets, ManagingAssetsEvents } from './4-assets';
import { LimitOrder, Amendment, UnidentifiedTrade, ExchangeLike, Config, OpenOrder, Balances, Positions, Snapshot } from './interfaces';
declare class Texchange extends ManagingAssets implements ExchangeLike {
    private sleep;
    constructor(config: Config, snapshot: Snapshot, sleep: (ms: number) => Promise<void>, now: () => number);
    makeOrdersDelay(orders: LimitOrder[]): Promise<OpenOrder[]>;
    amendOrdersDelay(amendments: Amendment[]): Promise<OpenOrder[]>;
    cancelOrdersDelay(orders: OpenOrder[]): Promise<OpenOrder[]>;
    getBalancesDelay(): Promise<Balances>;
    getPositionsDelay(): Promise<Positions>;
    getOpenOrdersDelay(): Promise<OpenOrder[]>;
    protected pushOrderbook(): Promise<void>;
    protected pushUTrades(uTrades: UnidentifiedTrade[]): Promise<void>;
    protected pushPositionsAndBalances(): Promise<void>;
}
export { Texchange as default, Texchange, ManagingAssetsEvents as TexchangeEvents, };

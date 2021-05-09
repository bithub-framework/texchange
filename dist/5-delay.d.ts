import { Texchange as Parent, Events } from './4-assets';
import { LimitOrder, Amendment, UnidentifiedTrade, ExchangeLike, Config, OpenOrder, Balances, Positions, Snapshot } from './interfaces';
declare class Texchange extends Parent implements ExchangeLike {
    private sleep;
    constructor(config: Config, snapshot: Snapshot, sleep: (ms: number) => Promise<void>, now: () => number);
    makeOrders(orders: LimitOrder[]): Promise<(OpenOrder | Error)[]>;
    amendOrders(amendments: Amendment[]): Promise<(OpenOrder | Error)[]>;
    cancelOrders(orders: OpenOrder[]): Promise<(OpenOrder | Error)[]>;
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
export { Texchange, Events, };

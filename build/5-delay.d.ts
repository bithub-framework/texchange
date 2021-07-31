import { Texchange as Parent, Events } from './4-assets';
import { LimitOrder, Amendment, UnidentifiedTrade, ExchangeLike, Config, OpenOrder, Balances, Positions, Snapshot } from './interfaces';
import Big from 'big.js';
declare class Texchange extends Parent implements ExchangeLike {
    private sleep;
    PRICE_DP: number;
    CURRENCY_DP: number;
    QUANTITY_DP: number;
    TICK_SIZE: Big;
    calcDollarVolume: (price: Big, quantity: Big) => Big;
    calcQuantity: (price: Big, dollarVolume: Big) => Big;
    LEVERAGE: number;
    TAKER_FEE_RATE: number;
    MAKER_FEE_RATE: number;
    ONE_WAY_POSITION: boolean;
    constructor(config: Config, snapshot: Snapshot, sleep: (ms: number) => Promise<void>, now: () => number);
    makeOrders(orders: LimitOrder[]): Promise<(OpenOrder | Error)[]>;
    amendOrders(amendments: Amendment[]): Promise<(OpenOrder | Error)[]>;
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
export { Texchange, Events, };

/// <reference types="node" />
import { Events } from './6-snapshot';
import { LimitOrder, Amendment, ExchangeLike, Config, OpenOrder, Balances, Positions, Snapshot, UnidentifiedTrade, Orderbook } from './interfaces';
import Big from 'big.js';
import { EventEmitter } from 'events';
declare class Texchange extends EventEmitter implements ExchangeLike {
    private config;
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
    private core;
    constructor(config: Config, snapshot: Snapshot, now: () => number, sleep: (ms: number) => Promise<void>);
    updateTrades(uTrades: UnidentifiedTrade[]): void;
    updateOrderbook(orderbook: Orderbook): void;
    makeOrders(orders: LimitOrder[]): Promise<(OpenOrder | Error)[]>;
    amendOrders(amendments: Amendment[]): Promise<(OpenOrder | Error)[]>;
    cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]>;
    getBalances(): Promise<Balances>;
    getPositions(): Promise<Positions>;
    getOpenOrders(): Promise<OpenOrder[]>;
}
interface Texchange extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
export { Texchange, Events, };

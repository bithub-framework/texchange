export * from 'interfaces';
import {
    Trade,
    Positions,
    Balances,
    LimitOrder,
    OpenOrder,
    Orderbook,
    Amendment,
    MarketSpec,
    AccountSpec,
} from 'interfaces';
import Big from 'big.js';
import { EventEmitter } from 'events';


export type UnidentifiedTrade = Omit<Trade, 'id'>;

export interface ExAssets extends Omit<Positions & Balances, 'time'> {
    cost: {
        [length: number]: Big;
    };
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    margin: Big;
}

export interface TexMarketConfig extends MarketSpec {
    PING: number;
    PROCESSING: number;
}

export interface TexAccountConfig extends AccountSpec {
    calcInitialMargin: (
        config: MarketSpec & AccountSpec,
        order: LimitOrder,
        settlementPrice: Big,
        latestPrice: Big,
    ) => Big,
    calcMarginIncrement: (
        config: MarketSpec & AccountSpec,
        price: Big,
        volume: Big,
    ) => Big,
    calcMarginDecrement: (
        config: MarketSpec & AccountSpec,
        assets: ExAssets,
        volume: Big,
    ) => Big,
    calcMargin: (
        config: MarketSpec & AccountSpec,
        assets: Omit<ExAssets, 'margin' | 'reserve'>,
        settlementPrice: Big,
        latestPrice: Big,
        autoMargin: Big,
    ) => Big,
    calcFrozenMargin: (
        config: MarketSpec & AccountSpec,
        order: OpenOrder,
        settlementPrice: Big,
        latestPrice: Big,
    ) => Big,
}

export interface Config extends TexMarketConfig, TexAccountConfig { }

export interface Snapshot {
    balance: Big;
    settlementPrice: Big;
}

export function min(...a: Big[]) {
    return a.reduce((m, x) => m.lt(x) ? m : x);
}

export type Events = {
    orderbook: [Orderbook];
    trades: [Trade[]];
    positions: [Positions];
    balances: [Balances];
    error: [Error];
}

export interface ExchangeLike extends EventEmitter {
    makeOrders(orders: LimitOrder[]): Promise<(OpenOrder | Error)[]>;
    amendOrders(amendments: Amendment[]): Promise<(OpenOrder | Error)[]>;
    cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]>;
    getOpenOrders(): Promise<OpenOrder[]>;
    getPositions(): Promise<Positions>;
    getBalances(): Promise<Balances>;

    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
    // on(event: string | symbol, listener: (...args: any[]) => void): this;
    // once(event: string | symbol, listener: (...args: any[]) => void): this;
    // off(event: string | symbol, listener: (...args: any[]) => void): this;
    // emit(event: string | symbol, ...args: any[]): boolean;
}

/// <reference types="node" />
export * from 'interfaces';
import { Trade, Positions, Balances, LimitOrder, OpenOrder, Orderbook, Amendment, MarketSpec, AccountSpec } from 'interfaces';
import Big from 'big.js';
import { EventEmitter } from 'events';
export declare type UnidentifiedTrade = Omit<Trade, 'id'>;
export interface Assets extends Omit<Positions & Balances, 'time'> {
    cost: {
        [length: number]: Big;
    };
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    margin: Big;
}
export interface MarketConfig extends MarketSpec {
    PING: number;
    PROCESSING: number;
}
export interface AccountConfig extends AccountSpec {
    calcInitialMargin: (config: MarketSpec & AccountSpec, order: LimitOrder, settlementPrice: Big, latestPrice: Big) => Big;
    calcMarginIncrement: (config: MarketSpec & AccountSpec, price: Big, volume: Big) => Big;
    calcMarginDecrement: (config: MarketSpec & AccountSpec, assets: Assets, volume: Big) => Big;
    calcMargin: (config: MarketSpec & AccountSpec, assets: Omit<Assets, 'margin' | 'reserve'>, settlementPrice: Big, latestPrice: Big, autoMargin: Big) => Big;
    calcFrozenMargin: (config: MarketSpec & AccountSpec, order: OpenOrder, settlementPrice: Big, latestPrice: Big) => Big;
}
export interface Config extends MarketConfig, AccountConfig {
}
export interface Snapshot {
    balance: Big;
    settlementPrice: Big;
}
export declare function min(...a: Big[]): Big;
export declare type Events = {
    orderbook: [Orderbook];
    trades: [Trade[]];
    positions: [Positions];
    balances: [Balances];
    error: [Error];
};
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
}

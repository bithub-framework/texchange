/// <reference types="node" />
export * from 'interfaces';
import { Trade, Positions, Balances, LimitOrder, OpenOrder, Orderbook, Amendment, MarketConfig, AccountConfig } from 'interfaces';
import Big from 'big.js';
import { EventEmitter } from 'events';
export declare type UnidentifiedTrade = Omit<Trade, 'id'>;
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
export interface TexMarketConfig extends MarketConfig {
    PING: number;
    PROCESSING: number;
}
export interface TexAccountConfig extends AccountConfig {
    calcInitialMargin: (config: MarketConfig & AccountConfig, order: LimitOrder, settlementPrice: Big, latestPrice: Big) => Big;
    calcMarginIncrement: (config: MarketConfig & AccountConfig, price: Big, volume: Big) => Big;
    calcMarginDecrement: (config: MarketConfig & AccountConfig, assets: ExAssets, volume: Big) => Big;
    calcMargin: (config: MarketConfig & AccountConfig, assets: Omit<ExAssets, 'margin' | 'reserve'>, settlementPrice: Big, latestPrice: Big, autoMargin: Big) => Big;
    calcFrozenMargin: (config: MarketConfig & AccountConfig, order: OpenOrder, settlementPrice: Big, latestPrice: Big) => Big;
}
export interface Config extends TexMarketConfig, TexAccountConfig {
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
    makeOrders(orders: LimitOrder[]): Promise<OpenOrder[]>;
    getOpenOrders(): Promise<OpenOrder[]>;
    cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]>;
    getPositions(): Promise<Positions>;
    getBalances(): Promise<Balances>;
    amendOrders(amendments: Amendment[]): Promise<OpenOrder[]>;
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}

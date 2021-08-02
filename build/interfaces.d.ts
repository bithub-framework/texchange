export * from 'interfaces';
import { Trade, Positions, Balances, LimitOrder, OpenOrder, Orderbook, MarketSpec, AccountSpec, ContextMarketApiLike, ContextAccountApiLike } from 'interfaces';
import Big from 'big.js';
import { OpenMakersSnapshot } from './state-managers/open-maker-manager';
import { AssetsSnapshot } from './state-managers/auto-assets';
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
    initialSettlementPrice: Big;
    initialLatestPrice: Big;
}
export interface AccountConfig extends AccountSpec {
    calcInitialMargin: (config: MarketSpec & AccountSpec, order: LimitOrder, settlementPrice: Big, latestPrice: Big) => Big;
    calcMarginIncrement: (config: MarketSpec & AccountSpec, price: Big, volume: Big) => Big;
    calcMarginDecrement: (config: MarketSpec & AccountSpec, assets: Assets, volume: Big) => Big;
    calcMargin: (config: MarketSpec & AccountSpec, assets: Omit<Assets, 'margin' | 'reserve'>, settlementPrice: Big, latestPrice: Big, autoMargin: Big) => Big;
    calcFrozenMargin: (config: MarketSpec & AccountSpec, order: OpenOrder, settlementPrice: Big, latestPrice: Big) => Big;
}
export interface Config extends MarketConfig, AccountConfig {
    marketName: string;
}
export interface Snapshot {
    time: number;
    openMakers: OpenMakersSnapshot;
    assets: AssetsSnapshot;
}
export declare function min(...a: Big[]): Big;
export interface Events {
    orderbook: [Orderbook];
    trades: [Trade[]];
    positions: [Positions];
    balances: [Balances];
    error: [Error];
}
export interface ExchangeLike extends ContextMarketApiLike, ContextAccountApiLike, MarketSpec, AccountSpec {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}

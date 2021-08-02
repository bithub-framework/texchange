export * from 'interfaces';
import { Trade, Positions, Balances, LimitOrder, OpenMaker, Orderbook, MarketSpec, AccountSpec, ContextMarketApiLike, ContextAccountApiLike } from 'interfaces';
import Big from 'big.js';
import { OpenMakersSnapshot } from './state-managers/open-maker-manager';
import { EquitySnapshot } from './state-managers/equity-manager';
import { MarginSnapshot } from './state-managers/margin-manager/main';
export declare type UnidentifiedTrade = Omit<Trade, 'id'>;
export interface Margin {
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
}
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
    calcInitialMargin: (args: {
        spec: MarketSpec & AccountSpec;
        order: LimitOrder;
        settlementPrice: Big;
        latestPrice: Big;
    }) => Big;
    calcMarginIncrement: (args: {
        spec: MarketSpec & AccountSpec;
        orderPrice: Big;
        volume: Big;
        dollarVolume: Big;
        settlementPrice: Big;
        latestPrice: Big;
    }) => Big;
    calcMarginDecrement: (args: {
        spec: MarketSpec & AccountSpec;
        position: Assets['position'];
        cost: Assets['cost'];
        volume: Big;
        marginSum: Big;
    }) => Big;
    reviseMargin: (args: {
        spec: MarketSpec & AccountSpec;
        position: Assets['position'];
        cost: Assets['cost'];
        settlementPrice: Big;
        latestPrice: Big;
        marginSum: Big;
    }) => Big;
    calcFrozenMargin: (args: {
        spec: MarketSpec & AccountSpec;
        maker: OpenMaker;
        settlementPrice: Big;
        latestPrice: Big;
    }) => Big;
    shouldBeCompulsorilyLiquidated: (args: {
        spec: MarketSpec & AccountSpec;
        settlementPrice: Big;
        latestPrice: Big;
    }) => boolean;
}
export interface Config extends MarketConfig, AccountConfig {
    marketName: string;
}
export interface Snapshot {
    time: number;
    openMakers: OpenMakersSnapshot;
    equity: EquitySnapshot;
    margin: MarginSnapshot;
}
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

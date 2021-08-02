export * from 'interfaces';
import {
    Trade,
    Positions,
    Balances,
    LimitOrder,
    OpenMaker,
    Orderbook,
    MarketSpec,
    AccountSpec,
    ContextMarketApiLike,
    ContextAccountApiLike,
} from 'interfaces';
import Big from 'big.js';
import { OpenMakersSnapshot } from './state-managers/open-maker-manager';
import { EquitySnapshot, EquityManager } from './state-managers/equity-manager';
import { MarginSnapshot } from './state-managers/margin-manager/main';


export type UnidentifiedTrade = Omit<Trade, 'id'>;


export interface Margin {
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
}

export interface MarketConfig extends MarketSpec {
    PING: number;
    PROCESSING: number;
    initialClearingPrice: Big;
    initialLatestPrice: Big;
}

export interface AccountConfig extends AccountSpec {
    calcInitialMargin: (args: {
        spec: MarketSpec & AccountSpec;
        order: LimitOrder;
        clearingPrice: Big;
        latestPrice: Big;
    }) => Big;
    calcPositionMarginIncrement: (args: {
        spec: MarketSpec & AccountSpec;
        orderPrice: Big;
        volume: Big;
        dollarVolume: Big;
        clearingPrice: Big;
        latestPrice: Big;
    }) => Big;
    calcPositionMarginDecrement: (args: {
        spec: MarketSpec & AccountSpec;
        position: EquityManager['position'];
        cost: EquityManager['cost'];
        volume: Big;
        marginSum: Big;
    }) => Big;
    calcFreezingMargin: (args: {
        spec: MarketSpec & AccountSpec;
        maker: OpenMaker;
        clearingPrice: Big;
        latestPrice: Big;
    }) => Big;
    calcPositionMarginOnceClearing: (args: {
        spec: MarketSpec & AccountSpec;
        position: EquityManager['position'];
        cost: EquityManager['cost'];
        clearingPrice: Big;
        latestPrice: Big;
        positionMargin: Big;
    }) => Big;
    shouldBeCompulsorilyLiquidated: (args: {
        spec: MarketSpec & AccountSpec;
        clearingPrice: Big;
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

export interface ExchangeLike extends
    ContextMarketApiLike,
    ContextAccountApiLike,
    MarketSpec,
    AccountSpec {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}

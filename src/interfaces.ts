export * from 'interfaces';
import {
    Trade,
    Positions,
    Balances,
    LimitOrder,
    OpenMaker,
    Orderbook,
    OpenOrder,
    MarketSpec,
    AccountSpec,
    ContextMarketApiLike,
    ContextAccountApiLike,
} from 'interfaces';
import Big from 'big.js';
import { OpenMakersSnapshot } from './state-managers/open-maker-manager';
import { EquitySnapshot, EquityManagerProps } from './state-managers/equity-manager';
import { MarginSnapshot, MarginManagerProps } from './state-managers/margin-manager/main';


export type UnidentifiedTrade = Omit<Trade, 'id'>;

export interface MarketConfig extends MarketSpec {
    PING: number;
    PROCESSING: number;
    initialMarkPrice: Big;
    initialLatestPrice: Big;
}




interface Spec {
    spec: MarketSpec & AccountSpec;
}
interface MarketInfo {
    time: number;
    markPrice: Big;
    latestPrice: Big;
}
interface TradesInfo {
    volume: Big;
    dollarVolume: Big;
}

export interface AccountConfig extends AccountSpec {
    calcInitialMargin: (ctx:
        Spec &
        MarketInfo &
        { order: LimitOrder }
    ) => Big;
    calcPositionMarginIncrement: (ctx:
        Spec &
        MarketInfo &
        TradesInfo &
        { order: OpenOrder }
    ) => Big;
    calcPositionMarginDecrement: (ctx:
        Spec &
        MarketInfo &
        TradesInfo &
        EquityManagerProps &
        MarginManagerProps
    ) => Big;
    calcFreezingMargin: (ctx:
        Spec &
        MarketInfo &
        { order: OpenMaker | LimitOrder }
    ) => Big;
    calcPositionMarginOnSettlement: (ctx:
        Spec &
        MarketInfo &
        EquityManagerProps &
        MarginManagerProps
    ) => Big;
    shouldBeCompulsorilyLiquidated: (ctx:
        Spec &
        MarketInfo &
        EquityManagerProps &
        MarginManagerProps
    ) => boolean;
    calcTotalPositionMargin: (ctx:
        Spec &
        MarketInfo &
        EquityManagerProps &
        MarginManagerProps
    ) => Big;
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

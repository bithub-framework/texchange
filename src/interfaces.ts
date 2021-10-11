export * from 'interfaces';
import {
    Length,
    Trade,
    Positions,
    Balances,
    Orderbook,
    MarketSpec, AccountSpec, MarketCalc,
    ContextMarketApiLike, ContextAccountApiLike,
    MarketEvents, AccountEvents,
} from 'interfaces';
import Big from 'big.js';
import { EventEmitter } from 'stream';


export interface DatabaseTrade extends Trade {
    id: string;
}


export interface MarketConfig extends MarketSpec {
    PING: number;
    PROCESSING: number;
}
export interface AccountConfig extends AccountSpec { }
export interface Config extends MarketConfig, AccountConfig {
    marketName: string;
}


export interface Snapshot {
    time: number;
    makers: any;
    assets: any;
    margin: any;
    mtm: any;
    misc: any;
}

export interface StateLike<Snapshot> {
    capture(): Snapshot;
}

export type Events = MarketEvents & AccountEvents;

export interface ApiLike extends ContextMarketApiLike, ContextAccountApiLike {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}

export interface ExchangeLike {
    interfaces: {
        latency: ApiLike;
    };

    config: MarketSpec & AccountSpec;
    calculation: MarketCalc;
    updating: {
        updateTrades: (trades: DatabaseTrade[]) => void;
        updateOrderbook: (orderbook: Orderbook) => void;
    };
}

export interface Frozen {
    balance: Big;
    position: Big;
    length: Length;
}

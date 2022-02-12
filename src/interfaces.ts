export * from 'interfaces';
export { Frozen } from './frozon';
import {
    Trade,
    MarketSpec, AccountSpec,
    ContextMarketApiLike, ContextAccountApiLike,
    MarketEvents, AccountEvents,
    Orderbook,
} from 'interfaces';
import Big from 'big.js';

export interface DatabaseTrade extends Trade {
    id: string;
}


export interface MarketConfig extends MarketSpec {
    PING: number;
    PROCESSING: number;
    initialMarkPrice: Big;
}
export interface AccountConfig extends AccountSpec {
    initialBalance: Big;
}
export interface Config extends MarketConfig, AccountConfig {
    marketName: string;
}




export type Events = MarketEvents & AccountEvents;

export interface ApiLike extends ContextMarketApiLike, ContextAccountApiLike {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}


export type TypeRecur<Type, Old, New> =
    Type extends Old
    ? New
    : (
        Type extends {}
        ? { [K in keyof Type]: TypeRecur<Type[K], Old, New> }
        : Type
    );

export type Parsed<T> = TypeRecur<TypeRecur<T, Big, string>, number, number | null>;


export interface TexchangeLike extends ApiLike {
    updateTrades(trades: DatabaseTrade[]): void;
    updateOrderbook(orderbook: Orderbook): void;
}

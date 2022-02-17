export * from 'interfaces';
export { Frozen } from './frozon';
import { Trade, ContextMarketApiLike, ContextAccountApiLike, MarketEvents, AccountEvents } from 'interfaces';
export interface DatabaseTrade extends Trade {
    id: string;
}
export declare type Events = MarketEvents & AccountEvents;
export interface ApiLike extends ContextMarketApiLike, ContextAccountApiLike {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
export declare type TypeRecur<Type, Old, New> = Type extends Old ? New : (Type extends {} ? {
    [K in keyof Type]: TypeRecur<Type[K], Old, New>;
} : Type);

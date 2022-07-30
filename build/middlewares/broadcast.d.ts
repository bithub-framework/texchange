import { EventEmitter } from 'events';
import { OrderbookLike, PositionsLike, BalancesLike, TradeLike, HLike } from 'secretary-like';
export declare class Broadcast<H extends HLike<H>> extends EventEmitter {
}
export declare namespace Broadcast {
    interface Events<H extends HLike<H>> {
        trades: [TradeLike<H>[]];
        orderbook: [OrderbookLike<H>];
        positions: [PositionsLike<H>];
        balances: [BalancesLike<H>];
        error: [Error];
    }
}
import Events = Broadcast.Events;
export interface Broadcast<H extends HLike<H>> extends EventEmitter {
    on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}

/// <reference types="node" />
import { Trade, Orderbook, Positions, Balances } from 'interfaces';
import { EventEmitter } from 'events';
export declare class Broadcast extends EventEmitter {
}
export declare namespace Broadcast {
    type Events = {
        trades: [readonly Readonly<Trade>[]];
        orderbook: [Readonly<Orderbook>];
        positions: [Readonly<Positions>];
        balances: [Readonly<Balances>];
    };
}
import Events = Broadcast.Events;
export interface Broadcast extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}

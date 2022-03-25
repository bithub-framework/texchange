/// <reference types="node" />
import { Orderbook, Positions, Balances, HLike, TexchangeTrades } from 'interfaces';
export declare namespace Broadcast {
    interface Events<H extends HLike<H>> {
        trades: [TexchangeTrades<H>];
        orderbook: [Orderbook<H>];
        positions: [Positions<H>];
        balances: [Balances<H>];
    }
}
import Events = Broadcast.Events;
export interface Broadcast<H extends HLike<H>> extends NodeJS.EventEmitter {
    on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}

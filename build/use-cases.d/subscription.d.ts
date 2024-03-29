import { Broadcast } from '../middlewares/broadcast';
import { HLike, MarketEvents, AccountEvents } from 'secretary-like';
import { EventEmitter } from 'events';
export declare class UseCaseSubscription<H extends HLike<H>> extends EventEmitter {
    private broadcast;
    constructor(broadcast: Broadcast<H>);
}
export interface Events<H extends HLike<H>> extends MarketEvents<H>, AccountEvents<H> {
}
export interface UseCaseSubscription<H extends HLike<H>> extends EventEmitter {
    on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}

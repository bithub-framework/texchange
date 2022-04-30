/// <reference types="node" />
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike, Trade, Orderbook, Positions, Balances } from 'interfaces';
import { EventEmitter } from 'events';
export declare class Subscription<H extends HLike<H>> extends EventEmitter {
    protected context: Context<H>;
    protected models: Subscription.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: Subscription.TaskDeps<H>;
    constructor(context: Context<H>, models: Subscription.ModelDeps<H>, broadcast: Broadcast<H>, tasks: Subscription.TaskDeps<H>);
}
export declare namespace Subscription {
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
    }
    interface Events<H extends HLike<H>> {
        trades: [readonly Trade<H>[]];
        orderbook: [Orderbook<H>];
        positions: [Positions<H>];
        balances: [Balances<H>];
    }
}
export declare namespace Subscription {
    interface Events<H extends HLike<H>> {
        trades: [readonly Trade<H>[]];
        orderbook: [Orderbook<H>];
        positions: [Positions<H>];
        balances: [Balances<H>];
    }
}
import Events = Subscription.Events;
export interface Subscription<H extends HLike<H>> extends EventEmitter {
    on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}

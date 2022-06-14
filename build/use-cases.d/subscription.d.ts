import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike, Trade, Orderbook, Positions, Balances } from 'secretary-like';
import { EventEmitter } from 'events';
export declare class UseCaseSubscription<H extends HLike<H>> extends EventEmitter {
    protected context: Context<H>;
    protected models: UseCaseSubscription.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: UseCaseSubscription.TaskDeps<H>;
    constructor(context: Context<H>, models: UseCaseSubscription.ModelDeps<H>, broadcast: Broadcast<H>, tasks: UseCaseSubscription.TaskDeps<H>);
}
export declare namespace UseCaseSubscription {
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
export declare namespace UseCaseSubscription {
    interface Events<H extends HLike<H>> {
        trades: [readonly Trade<H>[]];
        orderbook: [Orderbook<H>];
        positions: [Positions<H>];
        balances: [Balances<H>];
    }
}
import Events = UseCaseSubscription.Events;
export interface UseCaseSubscription<H extends HLike<H>> extends EventEmitter {
    on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}

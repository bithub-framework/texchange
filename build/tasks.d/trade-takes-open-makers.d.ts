import { TexchangeTrade, HLike } from 'interfaces';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, TradeTakesOpenMakersLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class TradeTakesOpenMakers<H extends HLike<H>> extends Task<H> implements TradeTakesOpenMakersLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: StatefulModels<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: TasksLike<H>;
    constructor(context: Context<H>, models: StatefulModels<H>, broadcast: Broadcast<H>, tasks: TasksLike<H>);
    tradeTakesOpenMakers(roTrade: TexchangeTrade<H>): void;
    private tradeShouldTakeOpenOrder;
    private tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
}

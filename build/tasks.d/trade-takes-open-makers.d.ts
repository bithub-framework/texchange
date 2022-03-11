import { Trade } from 'interfaces';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, TradeTakesOpenMakersLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class TradeTakesOpenMakers extends Task implements TradeTakesOpenMakersLike {
    protected readonly context: Context;
    protected readonly models: StatefulModels;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: StatefulModels, broadcast: Broadcast, tasks: TasksLike);
    tradeTakesOpenMakers(roTrade: Readonly<Trade>): void;
    private tradeShouldTakeOpenOrder;
    private tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
}

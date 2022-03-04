import { Trade } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { TasksLike, TradeTakesOpenMakersLike } from '../tasks-like';
import { Broadcast } from '../broadcast';
export declare class TradeTakesOpenMakers extends Task implements TradeTakesOpenMakersLike {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    tradeTakesOpenMakers(roTrade: Readonly<Trade>): void;
    private tradeShouldTakeOpenOrder;
    private tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
}

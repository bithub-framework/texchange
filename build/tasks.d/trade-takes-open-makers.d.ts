import { Trade } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, TradeTakesOpenMakersLike } from '../tasks';
import { Broadcast } from '../broadcast';
export declare class TradeTakesOpenMakers extends Task implements TradeTakesOpenMakersLike {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: Tasks);
    tradeTakesOpenMakers(roTrade: Readonly<Trade>): void;
    private tradeShouldTakeOpenOrder;
    private tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
}

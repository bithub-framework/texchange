import { OpenOrder, Trade } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { TasksLike, OrderTakesLike } from '../tasks-like';
import { Broadcast } from '../broadcast';
export declare class OrderTakes extends Task implements OrderTakesLike {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    /**
     * @param taker variable
     */
    orderTakes(taker: OpenOrder): Trade[];
}

import { Context } from '../context';
import { OpenOrder } from 'interfaces';
import { Models } from '../models';
import { Task } from './task';
import { TasksLike, MakeOpenOrderLike } from '../tasks-like';
import { Broadcast } from '../broadcast';
export declare class MakeOpenOrder extends Task implements MakeOpenOrderLike {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    makeOpenOrder(order: OpenOrder): OpenOrder;
}

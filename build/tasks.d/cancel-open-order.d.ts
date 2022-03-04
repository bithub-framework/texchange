import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { TasksLike, CancelOpenOrderLike } from '../tasks-like';
import { Broadcast } from '../broadcast';
import { OpenOrder } from 'interfaces';
export declare class CancelOpenOrder extends Task implements CancelOpenOrderLike {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    cancelOpenOrder(order: Readonly<OpenOrder>): OpenOrder;
}

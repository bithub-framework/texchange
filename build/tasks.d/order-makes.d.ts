import { OpenOrder } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { TasksLike, OrderMakesLike } from '../tasks-like';
import { Broadcast } from '../broadcast';
export declare class OrderMakes extends Task implements OrderMakesLike {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    orderMakes(openOrder: Readonly<OpenOrder>): void;
}

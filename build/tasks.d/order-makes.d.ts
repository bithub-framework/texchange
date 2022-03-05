import { OpenOrder } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { TasksLike, OrderMakesLike } from '../tasks-like';
import { Broadcast } from '../broadcast';
export declare class OrderMakes extends Task implements OrderMakesLike {
    protected readonly context: Context;
    protected readonly models: Models;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    orderMakes(openOrder: Readonly<OpenOrder>): void;
}

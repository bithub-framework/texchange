import { Context } from '../context';
import { ModelsStatic } from '../models/models-static';
import { Task } from '../task';
import { TasksLike, CancelOpenOrderLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
import { OpenOrder } from 'interfaces';
export declare class CancelOpenOrder extends Task implements CancelOpenOrderLike {
    protected readonly context: Context;
    protected readonly models: ModelsStatic;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: ModelsStatic, broadcast: Broadcast, tasks: TasksLike);
    cancelOpenOrder(order: Readonly<OpenOrder>): OpenOrder;
}

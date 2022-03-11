import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, CancelOpenOrderLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
import { OpenOrder } from 'interfaces';
export declare class CancelOpenOrder extends Task implements CancelOpenOrderLike {
    protected readonly context: Context;
    protected readonly models: StatefulModels;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: StatefulModels, broadcast: Broadcast, tasks: TasksLike);
    cancelOpenOrder(order: Readonly<OpenOrder>): OpenOrder;
}

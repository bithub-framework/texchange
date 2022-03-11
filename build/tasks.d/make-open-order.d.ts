import { Context } from '../context';
import { OpenOrder } from 'interfaces';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, MakeOpenOrderLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class MakeOpenOrder extends Task implements MakeOpenOrderLike {
    protected readonly context: Context;
    protected readonly models: StatefulModels;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: StatefulModels, broadcast: Broadcast, tasks: TasksLike);
    makeOpenOrder(order: OpenOrder): OpenOrder;
}

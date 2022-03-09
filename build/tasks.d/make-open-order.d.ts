import { Context } from '../context';
import { OpenOrder } from 'interfaces';
import { ModelsStatic } from '../models/models-static';
import { Task } from '../task';
import { TasksLike, MakeOpenOrderLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class MakeOpenOrder extends Task implements MakeOpenOrderLike {
    protected readonly context: Context;
    protected readonly models: ModelsStatic;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: ModelsStatic, broadcast: Broadcast, tasks: TasksLike);
    makeOpenOrder(order: OpenOrder): OpenOrder;
}

import { ModelsStatic } from '../models/models-static';
import { Context } from '../context';
import { TasksLike } from '../tasks/tasks-like';
import { OpenOrder } from 'interfaces';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
export declare class CancelOrder extends UseCase {
    protected readonly context: Context;
    protected readonly models: ModelsStatic;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: ModelsStatic, broadcast: Broadcast, tasks: TasksLike);
    cancelOrder(order: Readonly<OpenOrder>): OpenOrder;
}

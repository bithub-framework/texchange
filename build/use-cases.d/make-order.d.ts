import { ModelsStatic } from '../models/models-static';
import { Context } from '../context';
import { TasksLike } from '../tasks/tasks-like';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import { LimitOrder, OpenOrder } from 'interfaces';
export declare class MakeOrder extends UseCase {
    protected readonly context: Context;
    protected readonly models: ModelsStatic;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: ModelsStatic, broadcast: Broadcast, tasks: TasksLike);
    makeOrder(order: Readonly<LimitOrder>): OpenOrder;
}

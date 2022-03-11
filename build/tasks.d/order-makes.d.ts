import { OpenOrder } from 'interfaces';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, OrderMakesLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class OrderMakes extends Task implements OrderMakesLike {
    protected readonly context: Context;
    protected readonly models: StatefulModels;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: StatefulModels, broadcast: Broadcast, tasks: TasksLike);
    orderMakes(openOrder: Readonly<OpenOrder>): void;
}

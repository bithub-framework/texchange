import { OpenOrder } from 'interfaces';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, ValidateOrderLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class ValidateOrder extends Task implements ValidateOrderLike {
    protected readonly context: Context;
    protected readonly models: StatefulModels;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: StatefulModels, broadcast: Broadcast, tasks: TasksLike);
    validateOrder(order: Readonly<OpenOrder>): void;
    private validateQuantity;
    private validateFormat;
}

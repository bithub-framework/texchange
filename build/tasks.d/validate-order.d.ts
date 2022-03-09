import { OpenOrder } from 'interfaces';
import { Context } from '../context';
import { ModelsStatic } from '../models/models-static';
import { Task } from '../task';
import { TasksLike, ValidateOrderLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class ValidateOrder extends Task implements ValidateOrderLike {
    protected readonly context: Context;
    protected readonly models: ModelsStatic;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: ModelsStatic, broadcast: Broadcast, tasks: TasksLike);
    validateOrder(order: Readonly<OpenOrder>): void;
    private validateQuantity;
    private validateFormat;
}

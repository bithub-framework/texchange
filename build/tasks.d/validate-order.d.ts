import { OpenOrder } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { TasksLike, ValidateOrderLike } from '../tasks-like';
import { Broadcast } from '../broadcast';
export declare class ValidateOrder extends Task implements ValidateOrderLike {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    validateOrder(order: Readonly<OpenOrder>): void;
    private validateQuantity;
    private validateFormat;
}

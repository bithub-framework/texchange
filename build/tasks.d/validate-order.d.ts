import { OpenOrder } from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, ValidateOrderLike } from '../tasks';
export declare class ValidateOrder extends Task implements ValidateOrderLike {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, tasks: Tasks);
    validateOrder(order: Readonly<OpenOrder>): void;
    private validateQuantity;
    private validateFormat;
}

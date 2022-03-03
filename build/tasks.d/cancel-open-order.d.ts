import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, CancelOpenOrderLike } from '../tasks';
import { OpenOrder } from '../interfaces';
export declare class CancelOpenOrder extends Task implements CancelOpenOrderLike {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, tasks: Tasks);
    cancelOpenOrder(order: Readonly<OpenOrder>): OpenOrder;
}

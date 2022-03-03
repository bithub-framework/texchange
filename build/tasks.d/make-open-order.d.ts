import { Context } from '../context';
import { OpenOrder } from 'interfaces';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, MakeOpenOrderLike } from '../tasks';
export declare class MakeOpenOrder extends Task implements MakeOpenOrderLike {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, tasks: Tasks);
    makeOpenOrder(order: OpenOrder): OpenOrder;
}

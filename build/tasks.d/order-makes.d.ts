import { OpenOrder } from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, OrderMakesLike } from '../tasks';
export declare class OrderMakes extends Task implements OrderMakesLike {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, tasks: Tasks);
    orderMakes(openOrder: Readonly<OpenOrder>): void;
}

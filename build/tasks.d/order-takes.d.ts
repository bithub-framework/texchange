import { OpenOrder, Trade } from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, OrderTakesLike } from '../tasks';
export declare class OrderTakes extends Task implements OrderTakesLike {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, tasks: Tasks);
    /**
     * @param taker variable
     */
    orderTakes(taker: OpenOrder): Trade[];
}

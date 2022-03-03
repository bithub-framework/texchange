import { OpenOrder } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, OrderMakesLike } from '../tasks';
import { Broadcast } from '../broadcast';
export declare class OrderMakes extends Task implements OrderMakesLike {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: Tasks);
    orderMakes(openOrder: Readonly<OpenOrder>): void;
}

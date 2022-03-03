import { Context } from '../context';
import { OpenOrder } from 'interfaces';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, MakeOpenOrderLike } from '../tasks';
import { Broadcast } from '../broadcast';
export declare class MakeOpenOrder extends Task implements MakeOpenOrderLike {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: Tasks);
    makeOpenOrder(order: OpenOrder): OpenOrder;
}

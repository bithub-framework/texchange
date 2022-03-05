import { Models } from '../models';
import { Context } from '../context';
import { TasksLike } from '../tasks-like';
import { OpenOrder } from 'interfaces';
import { UseCase } from './use-case';
import { Broadcast } from '../broadcast';
export declare class CancelOrder extends UseCase {
    protected readonly context: Context;
    protected readonly models: Models;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    cancelOrder(order: Readonly<OpenOrder>): OpenOrder;
}

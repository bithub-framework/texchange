import { Models } from '../models';
import { Context } from '../context';
import { TasksLike } from '../tasks-like';
import { UseCase } from './use-case';
import { Broadcast } from '../broadcast';
import { Amendment, OpenOrder } from 'interfaces';
export declare class AmendOrder extends UseCase {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    amendOrder(amendment: Readonly<Amendment>): OpenOrder;
}

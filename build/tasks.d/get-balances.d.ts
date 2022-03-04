import { Models } from '../models';
import { Context } from '../context';
import { Balances } from 'interfaces';
import { Task } from './task';
import { Broadcast } from '../broadcast';
import { TasksLike, GetBalancesLike } from '../tasks-like';
export declare class GetBalances extends Task implements GetBalancesLike {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    getBalances(): Balances;
}

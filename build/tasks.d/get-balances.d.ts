import { ModelsStatic } from '../models/models-static';
import { Context } from '../context';
import { Balances } from 'interfaces';
import { Task } from '../task';
import { Broadcast } from '../broadcast';
import { TasksLike, GetBalancesLike } from '../tasks/tasks-like';
export declare class GetBalances extends Task implements GetBalancesLike {
    protected readonly context: Context;
    protected readonly models: ModelsStatic;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: ModelsStatic, broadcast: Broadcast, tasks: TasksLike);
    getBalances(): Balances;
}

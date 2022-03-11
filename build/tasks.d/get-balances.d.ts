import { StatefulModels } from '../models/stateful-models';
import { Context } from '../context';
import { Balances } from 'interfaces';
import { Task } from '../task';
import { Broadcast } from '../broadcast';
import { TasksLike, GetBalancesLike } from '../tasks/tasks-like';
export declare class GetBalances extends Task implements GetBalancesLike {
    protected readonly context: Context;
    protected readonly models: StatefulModels;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: StatefulModels, broadcast: Broadcast, tasks: TasksLike);
    getBalances(): Balances;
}

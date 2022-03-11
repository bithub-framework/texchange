import Big from 'big.js';
import { Context } from '../../context';
import { StatefulModels } from '../../models/stateful-models';
import { TasksLike } from '../../tasks/tasks-like';
import { Broadcast } from '../../broadcast';
import { GetAvailable } from './get-available';
export declare class DefaultGetAvailable extends GetAvailable {
    protected readonly context: Context;
    protected readonly models: StatefulModels;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: StatefulModels, broadcast: Broadcast, tasks: TasksLike);
    protected finalMargin(): Big;
    protected finalFrozenBalance(): Big;
}

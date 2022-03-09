import Big from 'big.js';
import { Context } from '../../context';
import { ModelsStatic } from '../../models/models-static';
import { TasksLike } from '../../tasks/tasks-like';
import { Broadcast } from '../../broadcast';
import { GetAvailable } from './get-available';
export declare class DefaultGetAvailable extends GetAvailable {
    protected readonly context: Context;
    protected readonly models: ModelsStatic;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: ModelsStatic, broadcast: Broadcast, tasks: TasksLike);
    protected finalMargin(): Big;
    protected finalFrozenBalance(): Big;
}

import Big from 'big.js';
import { Context } from '../../context';
import { ModelsStatic } from '../../models/models-static';
import { Task } from '../../task';
import { TasksLike, GetAvailableLike } from '../../tasks/tasks-like';
import { Broadcast } from '../../broadcast';
export declare abstract class GetAvailable extends Task implements GetAvailableLike {
    protected abstract readonly context: Context;
    protected abstract readonly models: ModelsStatic;
    protected abstract readonly broadcast: Broadcast;
    protected abstract readonly tasks: TasksLike;
    getAvailable(): Big;
    protected abstract finalMargin(): Big;
    protected abstract finalFrozenBalance(): Big;
}

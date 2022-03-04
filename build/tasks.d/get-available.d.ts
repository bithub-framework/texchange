import Big from 'big.js';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { TasksLike, GetAvailableLike } from '../tasks-like';
import { Broadcast } from '../broadcast';
export declare abstract class GetAvailable extends Task implements GetAvailableLike {
    protected abstract context: Context;
    protected abstract models: Models;
    protected abstract broadcast: Broadcast;
    protected abstract tasks: TasksLike;
    getAvailable(): Big;
    protected abstract finalMargin(): Big;
    protected abstract finalFrozenBalance(): Big;
}

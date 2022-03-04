import Big from 'big.js';
import { Context } from '../../context';
import { Models } from '../../models';
import { TasksLike } from '../../tasks-like';
import { Broadcast } from '../../broadcast';
import { GetAvailable } from '../get-available';
export declare class DefaultGetAvailable extends GetAvailable {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    protected finalMargin(): Big;
    protected finalFrozenBalance(): Big;
}

import { Length } from 'interfaces';
import Big from 'big.js';
import { Context } from '../../context';
import { Models } from '../../models';
import { TasksLike } from '../../tasks-like';
import { Broadcast } from '../../broadcast';
import { Settle } from '../settle';
export declare class DefaultSettle extends Settle {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    protected clearingMargin(length: Length, profit: Big): Big;
    protected assertEnoughBalance(): void;
}

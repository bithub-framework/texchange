import { Models } from '../models';
import { Context } from '../context';
import { TasksLike } from '../tasks-like';
import { UseCase } from './use-case';
import { DatabaseTrade } from '../models.d/progress';
import { Broadcast } from '../broadcast';
export declare class UpdateTrades extends UseCase {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: TasksLike;
    private realTimeSettlement;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike, realTimeSettlement: boolean);
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
}

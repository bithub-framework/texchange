import { Models } from '../models';
import { Context } from '../context';
import { TasksLike } from '../tasks-like';
import { UseCase } from './use-case';
import { DatabaseTrade } from '../models.d/progress';
import { Broadcast } from '../broadcast';
export declare class UpdateTrades extends UseCase {
    protected readonly context: Context;
    protected readonly models: Models;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    private readonly realTimeSettlement;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike, realTimeSettlement: boolean);
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
}

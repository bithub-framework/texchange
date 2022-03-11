import { StatefulModels } from '../models/stateful-models';
import { Context } from '../context';
import { TasksLike } from '../tasks/tasks-like';
import { UseCase } from '../use-case';
import { DatabaseTrade } from '../models.d/progress';
import { Broadcast } from '../broadcast';
export declare class UpdateTrades extends UseCase {
    protected readonly context: Context;
    protected readonly models: StatefulModels;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    private readonly realTimeSettlement;
    constructor(context: Context, models: StatefulModels, broadcast: Broadcast, tasks: TasksLike, realTimeSettlement: boolean);
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
}

import { ModelsStatic } from '../models/models-static';
import { Context } from '../context';
import { TasksLike } from '../tasks/tasks-like';
import { UseCase } from '../use-case';
import { DatabaseTrade } from '../models.d/progress';
import { Broadcast } from '../broadcast';
export declare class UpdateTrades extends UseCase {
    protected readonly context: Context;
    protected readonly models: ModelsStatic;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    private readonly realTimeSettlement;
    constructor(context: Context, models: ModelsStatic, broadcast: Broadcast, tasks: TasksLike, realTimeSettlement: boolean);
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
}

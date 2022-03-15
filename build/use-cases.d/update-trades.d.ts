import { StatefulModels } from '../models/stateful-models';
import { Context } from '../context';
import { TasksLike } from '../tasks/tasks-like';
import { UseCase } from '../use-case';
import { DatabaseTrade } from '../models.d/progress';
import { Broadcast } from '../broadcast';
import { HLike } from 'interfaces';
export declare class UpdateTrades<H extends HLike<H>> extends UseCase<H> {
    protected readonly context: Context<H>;
    protected readonly models: StatefulModels<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: TasksLike<H>;
    private readonly realTimeSettlement;
    constructor(context: Context<H>, models: StatefulModels<H>, broadcast: Broadcast<H>, tasks: TasksLike<H>, realTimeSettlement: boolean);
    updateTrades(trades: readonly DatabaseTrade<H>[]): void;
}

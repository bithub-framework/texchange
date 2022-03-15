import { Length, HLike } from 'interfaces';
import { Context } from '../../context';
import { StatefulModels } from '../../models/stateful-models';
import { Task } from '../../task';
import { TasksLike, SettleLike } from '../../tasks/tasks-like';
import { Broadcast } from '../../broadcast';
export declare abstract class Settle<H extends HLike<H>> extends Task<H> implements SettleLike {
    protected abstract readonly context: Context<H>;
    protected abstract readonly models: StatefulModels<H>;
    protected abstract readonly broadcast: Broadcast<H>;
    protected abstract readonly tasks: TasksLike<H>;
    settle(): void;
    protected abstract clearingMargin(length: Length, profit: H): H;
    protected abstract assertEnoughBalance(): void;
}

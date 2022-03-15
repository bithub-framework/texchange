import { Context } from '../../context';
import { StatefulModels } from '../../models/stateful-models';
import { Task } from '../../task';
import { TasksLike, GetAvailableLike } from '../../tasks/tasks-like';
import { Broadcast } from '../../broadcast';
import { HLike } from 'interfaces';
export declare abstract class GetAvailable<H extends HLike<H>> extends Task<H> implements GetAvailableLike<H> {
    protected abstract readonly context: Context<H>;
    protected abstract readonly models: StatefulModels<H>;
    protected abstract readonly broadcast: Broadcast<H>;
    protected abstract readonly tasks: TasksLike<H>;
    getAvailable(): H;
    protected abstract finalMargin(): H;
    protected abstract finalFrozenBalance(): H;
}

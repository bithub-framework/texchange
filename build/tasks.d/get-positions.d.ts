import { StatefulModels } from '../models/stateful-models';
import { Context } from '../context';
import { ConcretePositions, HLike } from 'interfaces';
import { Task } from '../task';
import { TasksLike, GetPositionsLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class GetPositions<H extends HLike<H>> extends Task<H> implements GetPositionsLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: StatefulModels<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: TasksLike<H>;
    constructor(context: Context<H>, models: StatefulModels<H>, broadcast: Broadcast<H>, tasks: TasksLike<H>);
    getPositions(): ConcretePositions<H>;
}

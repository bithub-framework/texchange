import { StatefulModels } from '../models/stateful-models';
import { Context } from '../context';
import { ConcreteBalances, HLike } from 'interfaces';
import { Task } from '../task';
import { Broadcast } from '../broadcast';
import { TasksLike, GetBalancesLike } from '../tasks/tasks-like';
export declare class GetBalances<H extends HLike<H>> extends Task<H> implements GetBalancesLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: StatefulModels<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: TasksLike<H>;
    constructor(context: Context<H>, models: StatefulModels<H>, broadcast: Broadcast<H>, tasks: TasksLike<H>);
    getBalances(): ConcreteBalances<H>;
}

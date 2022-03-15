import { Context } from '../context';
import { TexchangeOpenOrder, HLike } from 'interfaces';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, MakeOpenOrderLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class MakeOpenOrder<H extends HLike<H>> extends Task<H> implements MakeOpenOrderLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: StatefulModels<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: TasksLike<H>;
    constructor(context: Context<H>, models: StatefulModels<H>, broadcast: Broadcast<H>, tasks: TasksLike<H>);
    makeOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}

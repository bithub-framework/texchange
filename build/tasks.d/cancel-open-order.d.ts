import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, CancelOpenOrderLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
import { TexchangeOpenOrder, HLike } from 'interfaces';
export declare class CancelOpenOrder<H extends HLike<H>> extends Task<H> implements CancelOpenOrderLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: StatefulModels<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: TasksLike<H>;
    constructor(context: Context<H>, models: StatefulModels<H>, broadcast: Broadcast<H>, tasks: TasksLike<H>);
    cancelOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}

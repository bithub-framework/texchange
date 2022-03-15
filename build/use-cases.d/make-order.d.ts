import { StatefulModels } from '../models/stateful-models';
import { Context } from '../context';
import { TasksLike } from '../tasks/tasks-like';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import { LimitOrder, TexchangeOpenOrder, HLike } from 'interfaces';
export declare class MakeOrder<H extends HLike<H>> extends UseCase<H> {
    protected readonly context: Context<H>;
    protected readonly models: StatefulModels<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: TasksLike<H>;
    constructor(context: Context<H>, models: StatefulModels<H>, broadcast: Broadcast<H>, tasks: TasksLike<H>);
    makeOrder(order: LimitOrder<H>): TexchangeOpenOrder<H>;
}

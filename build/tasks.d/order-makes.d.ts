import { ConcreteOpenOrder, HLike } from 'interfaces';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, OrderMakesLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class OrderMakes<H extends HLike<H>> extends Task<H> implements OrderMakesLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: StatefulModels<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: TasksLike<H>;
    constructor(context: Context<H>, models: StatefulModels<H>, broadcast: Broadcast<H>, tasks: TasksLike<H>);
    orderMakes(openOrder: ConcreteOpenOrder<H>): void;
}

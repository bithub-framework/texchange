import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, ValidateOrderLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class ValidateOrder<H extends HLike<H>> extends Task<H> implements ValidateOrderLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: StatefulModels<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: TasksLike<H>;
    constructor(context: Context<H>, models: StatefulModels<H>, broadcast: Broadcast<H>, tasks: TasksLike<H>);
    validateOrder(order: TexchangeOpenOrder<H>): void;
    private validateQuantity;
    private validateFormat;
}

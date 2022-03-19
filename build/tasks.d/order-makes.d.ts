import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models/models';
import { Task } from '../task';
import { Tasks, OrderMakesLike } from '../tasks/tasks';
import { Broadcast } from '../broadcast';
export declare class OrderMakes<H extends HLike<H>> extends Task<H> implements OrderMakesLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
    orderMakes(openOrder: TexchangeOpenOrder<H>): void;
}

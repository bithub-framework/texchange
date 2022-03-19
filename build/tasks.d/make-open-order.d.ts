import { Context } from '../context';
import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Models } from '../models/models';
import { Task } from '../task';
import { Tasks, MakeOpenOrderLike } from '../tasks/tasks';
import { Broadcast } from '../broadcast';
export declare class MakeOpenOrder<H extends HLike<H>> extends Task<H> implements MakeOpenOrderLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
    makeOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}

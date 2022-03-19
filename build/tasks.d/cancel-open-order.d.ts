import { Context } from '../context';
import { Models } from '../models/models';
import { Task } from '../task';
import { Tasks, CancelOpenOrderLike } from '../tasks/tasks';
import { Broadcast } from '../broadcast';
import { TexchangeOpenOrder, HLike } from 'interfaces';
export declare class CancelOpenOrder<H extends HLike<H>> extends Task<H> implements CancelOpenOrderLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
    cancelOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}

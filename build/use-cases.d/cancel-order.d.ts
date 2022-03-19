import { Models } from '../models/models';
import { Context } from '../context';
import { Tasks } from '../tasks/tasks';
import { TexchangeOpenOrder, HLike } from 'interfaces';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
export declare class CancelOrder<H extends HLike<H>> extends UseCase<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
    cancelOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}

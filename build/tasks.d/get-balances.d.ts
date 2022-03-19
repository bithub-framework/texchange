import { Models } from '../models/models';
import { Context } from '../context';
import { Balances, HLike } from 'interfaces';
import { Task } from '../task';
import { Broadcast } from '../broadcast';
import { Tasks, GetBalancesLike } from '../tasks/tasks';
export declare class GetBalances<H extends HLike<H>> extends Task<H> implements GetBalancesLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
    getBalances(): Balances<H>;
}

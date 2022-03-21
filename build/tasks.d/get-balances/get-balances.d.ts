import { Context } from '../../context';
import { Balances, HLike } from 'interfaces';
import { Task } from '../../task';
import { Broadcast } from '../../broadcast';
import { GetBalancesLike } from './get-balances-like';
import { Assets } from '../../models.d/assets';
import { GetAvailableLike } from '../get-available/get-available-like';
export declare class GetBalances<H extends HLike<H>> extends Task<H> implements GetBalancesLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: GetBalances.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: GetBalances.TaskDeps<H>;
    constructor(context: Context<H>, models: GetBalances.ModelDeps<H>, broadcast: Broadcast<H>, tasks: GetBalances.TaskDeps<H>);
    getBalances(): Balances<H>;
}
export declare namespace GetBalances {
    interface ModelDeps<H extends HLike<H>> extends Task.ModelDeps<H> {
        assets: Assets<H>;
    }
    interface TaskDeps<H extends HLike<H>> extends Task.TaskDeps<H> {
        getAvailable: GetAvailableLike<H>;
    }
}

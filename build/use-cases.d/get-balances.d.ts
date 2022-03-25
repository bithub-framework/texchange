import { Context } from '../context/context';
import { Broadcast } from '../broadcast';
import { Balances, HLike } from 'interfaces';
import { GetBalancesLike } from '../tasks.d/get-balances/get-balances-like';
export declare class GetBalances<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: GetBalances.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: GetBalances.TaskDeps<H>;
    constructor(context: Context<H>, models: GetBalances.ModelDeps<H>, broadcast: Broadcast<H>, tasks: GetBalances.TaskDeps<H>);
    getBalances(): Balances<H>;
}
export declare namespace GetBalances {
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
        getBalances: GetBalancesLike<H>;
    }
}

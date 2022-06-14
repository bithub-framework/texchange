import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { Balances, HLike } from 'secretary-like';
import { TaskGetBalances } from '../tasks.d/get-balances';
export declare class UseCaseGetBalances<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: UseCaseGetBalances.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: UseCaseGetBalances.TaskDeps<H>;
    constructor(context: Context<H>, models: UseCaseGetBalances.ModelDeps<H>, broadcast: Broadcast<H>, tasks: UseCaseGetBalances.TaskDeps<H>);
    getBalances(): Balances<H>;
}
export declare namespace UseCaseGetBalances {
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
        getBalances: TaskGetBalances<H>;
    }
}

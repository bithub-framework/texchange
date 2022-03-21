import { Context } from '../context';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import { Balances, HLike } from 'interfaces';
import { GetBalancesLike } from '../tasks.d/get-balances/get-balances-like';
export declare class GetBalances<H extends HLike<H>> extends UseCase<H> {
    protected readonly context: Context<H>;
    protected readonly models: GetBalances.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: GetBalances.TaskDeps<H>;
    constructor(context: Context<H>, models: GetBalances.ModelDeps<H>, broadcast: Broadcast<H>, tasks: GetBalances.TaskDeps<H>);
    getBalances(): Balances<H>;
}
export declare namespace GetBalances {
    interface ModelDeps<H extends HLike<H>> extends UseCase.ModelDeps<H> {
    }
    interface TaskDeps<H extends HLike<H>> extends UseCase.TaskDeps<H> {
        getBalances: GetBalancesLike<H>;
    }
}

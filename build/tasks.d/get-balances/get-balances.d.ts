import { Context } from '../../context';
import { Balances, HLike } from 'interfaces';
import { Broadcast } from '../../broadcast';
import { GetBalancesLike } from './get-balances-like';
import { Assets } from '../../models.d/assets';
import { GetAvailableLike } from '../get-available/get-available-like';
export declare class GetBalances<H extends HLike<H>> implements GetBalancesLike<H> {
    private tasks;
    private context;
    private models;
    private broadcast;
    constructor(tasks: GetBalances.TaskDeps<H>, context: Context<H>, models: GetBalances.ModelDeps<H>, broadcast: Broadcast<H>);
    getBalances(): Balances<H>;
}
export declare namespace GetBalances {
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        getAvailable: GetAvailableLike<H>;
    }
}

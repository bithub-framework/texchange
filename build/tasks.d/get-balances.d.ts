import { Context } from '../context';
import { Balances, HLike } from 'secretary-like';
import { Assets } from '../models.d/assets';
import { TaskGetAvailable } from './get-available/get-available';
export declare class TaskGetBalances<H extends HLike<H>> {
    private context;
    private models;
    private tasks;
    constructor(context: Context<H>, models: TaskGetBalances.ModelDeps<H>);
    getBalances(): Balances<H>;
}
export declare namespace TaskGetBalances {
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        getAvailable: TaskGetAvailable<H>;
    }
}

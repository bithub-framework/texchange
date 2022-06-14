import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike, OpenOrder } from 'secretary-like';
import { Makers } from '../models.d/makers/makers';
export declare class UseCaseGetOpenOrders<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: UseCaseGetOpenOrders.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: UseCaseGetOpenOrders.TaskDeps<H>;
    constructor(context: Context<H>, models: UseCaseGetOpenOrders.ModelDeps<H>, broadcast: Broadcast<H>, tasks: UseCaseGetOpenOrders.TaskDeps<H>);
    getOpenOrders(): OpenOrder<H>[];
}
export declare namespace UseCaseGetOpenOrders {
    interface ModelDeps<H extends HLike<H>> {
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}

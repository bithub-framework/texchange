import { Context } from '../context';
import { HLike, OpenOrder } from 'secretary-like';
import { Broadcast } from '../broadcast';
import { TaskCancelOpenOrder } from '../tasks.d/cancel-open-order';
export declare class UseCaseCancelOrder<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: UseCaseCancelOrder.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: UseCaseCancelOrder.TaskDeps<H>;
    constructor(context: Context<H>, models: UseCaseCancelOrder.ModelDeps<H>, broadcast: Broadcast<H>, tasks: UseCaseCancelOrder.TaskDeps<H>);
    cancelOrder(order: OpenOrder<H>): OpenOrder<H>;
}
export declare namespace UseCaseCancelOrder {
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
        cancelOpenOrder: TaskCancelOpenOrder<H>;
    }
}

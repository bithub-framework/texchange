import { Context } from '../context';
import { HLike, OpenOrder } from 'secretary-like';
import { Broadcast } from '../broadcast';
import { CancelOpenOrderLike } from '../tasks.d/cancel-open-order/cancel-open-order-like';
export declare class CancelOrder<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: CancelOrder.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: CancelOrder.TaskDeps<H>;
    constructor(context: Context<H>, models: CancelOrder.ModelDeps<H>, broadcast: Broadcast<H>, tasks: CancelOrder.TaskDeps<H>);
    cancelOrder(order: OpenOrder<H>): OpenOrder<H>;
}
export declare namespace CancelOrder {
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
        cancelOpenOrder: CancelOpenOrderLike<H>;
    }
}

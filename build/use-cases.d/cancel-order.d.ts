import { Context } from '../context/context';
import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Broadcast } from '../broadcast';
import { CancelOpenOrderLike } from '../tasks.d/cancel-open-order/cancel-open-order-like';
export declare class CancelOrder<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: CancelOrder.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: CancelOrder.TaskDeps<H>;
    constructor(context: Context<H>, models: CancelOrder.ModelDeps<H>, broadcast: Broadcast<H>, tasks: CancelOrder.TaskDeps<H>);
    cancelOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}
export declare namespace CancelOrder {
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
        cancelOpenOrder: CancelOpenOrderLike<H>;
    }
}

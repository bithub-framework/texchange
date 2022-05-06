import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike, Amendment, OpenOrder } from 'secretary-like';
import { CancelOpenOrderLike } from '../tasks.d/cancel-open-order/cancel-open-order-like';
import { ValidateOrderLike } from '../tasks.d/validate-order/validate-order-like';
import { MakeOpenOrderLike } from '../tasks.d/make-open-order/make-open-order-like';
export declare class AmendOrder<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: AmendOrder.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: AmendOrder.TaskDeps<H>;
    constructor(context: Context<H>, models: AmendOrder.ModelDeps<H>, broadcast: Broadcast<H>, tasks: AmendOrder.TaskDeps<H>);
    amendOrder(amendment: Amendment<H>): OpenOrder<H>;
}
export declare namespace AmendOrder {
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
        makeOpenOrder: MakeOpenOrderLike<H>;
        cancelOpenOrder: CancelOpenOrderLike<H>;
        validateOrder: ValidateOrderLike<H>;
    }
}

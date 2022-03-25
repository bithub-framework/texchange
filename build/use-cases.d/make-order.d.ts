import { Context } from '../context/context';
import { Broadcast } from '../broadcast';
import { LimitOrder, TexchangeOpenOrder, HLike } from 'interfaces';
import { Progress } from '../models.d/progress';
import { MakeOpenOrderLike } from '../tasks.d/make-open-order/make-open-order-like';
export declare class MakeOrder<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: MakeOrder.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: MakeOrder.TaskDeps<H>;
    constructor(context: Context<H>, models: MakeOrder.ModelDeps<H>, broadcast: Broadcast<H>, tasks: MakeOrder.TaskDeps<H>);
    makeOrder(order: LimitOrder<H>): TexchangeOpenOrder<H>;
}
export declare namespace MakeOrder {
    interface ModelDeps<H extends HLike<H>> {
        progress: Progress<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        makeOpenOrder: MakeOpenOrderLike<H>;
    }
}

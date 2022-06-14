import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { LimitOrder, HLike, OpenOrder } from 'secretary-like';
import { Progress } from '../models.d/progress';
import { TaskMakeOpenOrder } from '../tasks.d/make-open-order';
export declare class UseCaseMakeOrder<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: UseCaseMakeOrder.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: UseCaseMakeOrder.TaskDeps<H>;
    constructor(context: Context<H>, models: UseCaseMakeOrder.ModelDeps<H>, broadcast: Broadcast<H>, tasks: UseCaseMakeOrder.TaskDeps<H>);
    makeOrder(order: LimitOrder<H>): OpenOrder<H>;
}
export declare namespace UseCaseMakeOrder {
    interface ModelDeps<H extends HLike<H>> {
        progress: Progress<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        makeOpenOrder: TaskMakeOpenOrder<H>;
    }
}

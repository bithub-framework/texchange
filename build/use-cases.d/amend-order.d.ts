import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike, Amendment, OpenOrder } from 'secretary-like';
import { TaskCancelOpenOrder } from '../tasks.d/cancel-open-order';
import { TaskValidateOrder } from '../tasks.d/validate-order';
import { TaskMakeOpenOrder } from '../tasks.d/make-open-order';
export declare class UseCaseAmendOrder<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: UseCaseAmendOrder.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: UseCaseAmendOrder.TaskDeps<H>;
    constructor(context: Context<H>, models: UseCaseAmendOrder.ModelDeps<H>, broadcast: Broadcast<H>, tasks: UseCaseAmendOrder.TaskDeps<H>);
    amendOrder(amendment: Amendment<H>): OpenOrder<H>;
}
export declare namespace UseCaseAmendOrder {
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
        makeOpenOrder: TaskMakeOpenOrder<H>;
        cancelOpenOrder: TaskCancelOpenOrder<H>;
        validateOrder: TaskValidateOrder<H>;
    }
}

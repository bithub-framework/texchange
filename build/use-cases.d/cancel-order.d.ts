import { Context } from '../context';
import { TexchangeOpenOrder, HLike } from 'interfaces';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import { CancelOpenOrderLike } from '../tasks.d/cancel-open-order/cancel-open-order-like';
export declare class CancelOrder<H extends HLike<H>> extends UseCase<H> {
    protected readonly context: Context<H>;
    protected readonly models: CancelOrder.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: CancelOrder.TaskDeps<H>;
    constructor(context: Context<H>, models: CancelOrder.ModelDeps<H>, broadcast: Broadcast<H>, tasks: CancelOrder.TaskDeps<H>);
    cancelOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}
export declare namespace CancelOrder {
    interface ModelDeps<H extends HLike<H>> extends UseCase.ModelDeps<H> {
    }
    interface TaskDeps<H extends HLike<H>> extends UseCase.TaskDeps<H> {
        cancelOpenOrder: CancelOpenOrderLike<H>;
    }
}

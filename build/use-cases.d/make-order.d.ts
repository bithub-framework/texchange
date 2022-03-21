import { Context } from '../context';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import { LimitOrder, TexchangeOpenOrder, HLike } from 'interfaces';
import { Progress } from '../models.d/progress';
import { MakeOpenOrderLike } from '../tasks.d/make-open-order/make-open-order-like';
export declare class MakeOrder<H extends HLike<H>> extends UseCase<H> {
    protected readonly context: Context<H>;
    protected readonly models: MakeOrder.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: MakeOrder.TaskDeps<H>;
    constructor(context: Context<H>, models: MakeOrder.ModelDeps<H>, broadcast: Broadcast<H>, tasks: MakeOrder.TaskDeps<H>);
    makeOrder(order: LimitOrder<H>): TexchangeOpenOrder<H>;
}
export declare namespace MakeOrder {
    interface ModelDeps<H extends HLike<H>> extends UseCase.ModelDeps<H> {
        progress: Progress<H>;
    }
    interface TaskDeps<H extends HLike<H>> extends UseCase.TaskDeps<H> {
        makeOpenOrder: MakeOpenOrderLike<H>;
    }
}

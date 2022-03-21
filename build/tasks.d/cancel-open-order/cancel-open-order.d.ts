import { Context } from '../../context';
import { Task } from '../../task';
import { CancelOpenOrderLike } from './cancel-open-order-like';
import { Broadcast } from '../../broadcast';
import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Makers } from '../../models.d/makers';
export declare class CancelOpenOrder<H extends HLike<H>> extends Task<H> implements CancelOpenOrderLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: CancelOpenOrder.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: CancelOpenOrder.TaskDeps<H>;
    constructor(context: Context<H>, models: CancelOpenOrder.ModelDeps<H>, broadcast: Broadcast<H>, tasks: CancelOpenOrder.TaskDeps<H>);
    cancelOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}
export declare namespace CancelOpenOrder {
    interface ModelDeps<H extends HLike<H>> extends Task.ModelDeps<H> {
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> extends Task.TaskDeps<H> {
    }
}

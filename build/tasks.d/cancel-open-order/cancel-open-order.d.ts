import { Context } from '../../context/context';
import { CancelOpenOrderLike } from './cancel-open-order-like';
import { Broadcast } from '../../broadcast';
import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Makers } from '../../models.d/makers/makers';
export declare class CancelOpenOrder<H extends HLike<H>> implements CancelOpenOrderLike<H> {
    protected context: Context<H>;
    protected models: CancelOpenOrder.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: CancelOpenOrder.TaskDeps<H>;
    private OrderId;
    private OpenOrder;
    constructor(context: Context<H>, models: CancelOpenOrder.ModelDeps<H>, broadcast: Broadcast<H>, tasks: CancelOpenOrder.TaskDeps<H>);
    cancelOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}
export declare namespace CancelOpenOrder {
    interface ModelDeps<H extends HLike<H>> {
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}

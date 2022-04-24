import { Context } from '../../context';
import { CancelOpenOrderLike } from './cancel-open-order-like';
import { Broadcast } from '../../broadcast';
import { HLike } from 'interfaces';
import { OpenOrder } from '../../interfaces';
import { Makers } from '../../models.d/makers/makers';
export declare class CancelOpenOrder<H extends HLike<H>> implements CancelOpenOrderLike<H> {
    private context;
    private models;
    private broadcast;
    static TaskDeps: {};
    private tasks;
    constructor(context: Context<H>, models: CancelOpenOrder.ModelDeps<H>, broadcast: Broadcast<H>);
    cancelOpenOrder(order: OpenOrder<H>): OpenOrder<H>;
}
export declare namespace CancelOpenOrder {
    interface ModelDeps<H extends HLike<H>> {
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}

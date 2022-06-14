import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike, OpenOrder } from 'secretary-like';
import { Makers } from '../models.d/makers/makers';
export declare class TaskCancelOpenOrder<H extends HLike<H>> {
    private context;
    private models;
    private broadcast;
    private tasks;
    constructor(context: Context<H>, models: TaskCancelOpenOrder.ModelDeps<H>, broadcast: Broadcast<H>);
    cancelOpenOrder(order: OpenOrder<H>): OpenOrder<H>;
}
export declare namespace TaskCancelOpenOrder {
    interface ModelDeps<H extends HLike<H>> {
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}

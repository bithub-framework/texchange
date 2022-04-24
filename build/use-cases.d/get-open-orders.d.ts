import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'interfaces';
import { OpenOrder } from '../interfaces';
import { Makers } from '../models.d/makers/makers';
export declare class GetOpenOrders<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: GetOpenOrders.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: GetOpenOrders.TaskDeps<H>;
    constructor(context: Context<H>, models: GetOpenOrders.ModelDeps<H>, broadcast: Broadcast<H>, tasks: GetOpenOrders.TaskDeps<H>);
    getOpenOrders(): OpenOrder<H>[];
}
export declare namespace GetOpenOrders {
    interface ModelDeps<H extends HLike<H>> {
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}

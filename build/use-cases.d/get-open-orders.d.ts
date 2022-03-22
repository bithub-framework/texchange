import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Makers } from '../models.d/makers';
export declare class GetOpenOrders<H extends HLike<H>> {
    protected readonly context: Context<H>;
    protected readonly models: GetOpenOrders.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: GetOpenOrders.TaskDeps<H>;
    constructor(context: Context<H>, models: GetOpenOrders.ModelDeps<H>, broadcast: Broadcast<H>, tasks: GetOpenOrders.TaskDeps<H>);
    getOpenOrders(): TexchangeOpenOrder<H>[];
}
export declare namespace GetOpenOrders {
    interface ModelDeps<H extends HLike<H>> {
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}

import { HLike, OpenOrder, MarketSpec, AccountSpec } from 'secretary-like';
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { TaskGetAvailable } from './get-available/get-available';
import { TaskGetClosable } from './get-closable';
import { Makers } from '../models.d/makers/makers';
export declare class TaskValidateOrder<H extends HLike<H>> {
    private context;
    private marketSpec;
    private accountSpec;
    private models;
    private broadcast;
    private tasks;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>, accountSpec: AccountSpec, models: TaskValidateOrder.ModelDeps<H>, broadcast: Broadcast<H>);
    validateOrder(order: OpenOrder<H>): void;
    private validateQuantity;
    private validateFormat;
}
export declare namespace TaskValidateOrder {
    interface ModelDeps<H extends HLike<H>> {
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        getAvailable: TaskGetAvailable<H>;
        getClosable: TaskGetClosable<H>;
    }
}

import { Context } from '../context';
import { HLike, OpenOrder } from 'secretary-like';
import { Broadcast } from '../broadcast';
import { Book } from '../models.d/book';
import { TaskValidateOrder } from './validate-order';
import { TaskOrderTakes } from './order-takes';
import { TaskOrderMakes } from './order-makes';
import { TaskGetBalances } from './get-balances';
import { TaskGetPositions } from './get-positions';
export declare class TaskMakeOpenOrder<H extends HLike<H>> {
    private context;
    private models;
    private broadcast;
    private tasks;
    constructor(context: Context<H>, models: TaskMakeOpenOrder.ModelDeps<H>, broadcast: Broadcast<H>);
    makeOpenOrder(order: OpenOrder<H>): OpenOrder<H>;
}
export declare namespace TaskMakeOpenOrder {
    interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        validateOrder: TaskValidateOrder<H>;
        orderTakes: TaskOrderTakes<H>;
        orderMakes: TaskOrderMakes<H>;
        getBalances: TaskGetBalances<H>;
        getPositions: TaskGetPositions<H>;
    }
}

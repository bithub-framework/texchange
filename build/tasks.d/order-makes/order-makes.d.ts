import { HLike } from 'interfaces';
import { OpenOrder } from '../../interfaces';
import { Context } from '../../context';
import { OrderMakesLike } from './order-makes-like';
import { Broadcast } from '../../broadcast';
import { Book } from '../../models.d/book';
import { Makers } from '../../models.d/makers/makers';
export declare class OrderMakes<H extends HLike<H>> implements OrderMakesLike<H> {
    private context;
    private models;
    private broadcast;
    static TaskDeps: {};
    private tasks;
    private OrderId;
    private OpenOrder;
    constructor(context: Context<H>, models: OrderMakes.ModelDeps<H>, broadcast: Broadcast<H>);
    orderMakes(order: OpenOrder<H>): void;
}
export declare namespace OrderMakes {
    interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}

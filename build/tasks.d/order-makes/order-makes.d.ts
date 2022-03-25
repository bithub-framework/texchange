import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Context } from '../../context/context';
import { OrderMakesLike } from './order-makes-like';
import { Broadcast } from '../../broadcast';
import { Book } from '../../models.d/book';
import { Makers } from '../../models.d/makers/makers';
export declare class OrderMakes<H extends HLike<H>> implements OrderMakesLike<H> {
    protected context: Context<H>;
    protected models: OrderMakes.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: OrderMakes.TaskDeps<H>;
    private OrderId;
    private OpenOrder;
    constructor(context: Context<H>, models: OrderMakes.ModelDeps<H>, broadcast: Broadcast<H>, tasks: OrderMakes.TaskDeps<H>);
    orderMakes(order: TexchangeOpenOrder<H>): void;
}
export declare namespace OrderMakes {
    interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}

import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Context } from '../../context/context';
import { OrderMakesLike } from './order-makes-like';
import { Broadcast } from '../../broadcast';
import { Book } from '../../models.d/book';
import { Makers } from '../../models.d/makers/makers';
export declare class OrderMakes<H extends HLike<H>> implements OrderMakesLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: OrderMakes.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: OrderMakes.TaskDeps<H>;
    constructor(context: Context<H>, models: OrderMakes.ModelDeps<H>, broadcast: Broadcast<H>, tasks: OrderMakes.TaskDeps<H>);
    orderMakes(openOrder: TexchangeOpenOrder<H>): void;
}
export declare namespace OrderMakes {
    interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}

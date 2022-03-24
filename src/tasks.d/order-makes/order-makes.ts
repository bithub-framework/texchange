import {
    TexchangeOpenOrder,
    TexchangeOpenMaker,
    TexchangeOpenOrderStatic,
    TexchangeOrderIdStatic,
    HLike,
} from 'interfaces';
import { Context } from '../../context/context';
import { OrderMakesLike } from './order-makes-like';
import { Broadcast } from '../../broadcast';

import { Book } from '../../models.d/book';
import { Makers } from '../../models.d/makers/makers';


export class OrderMakes<H extends HLike<H>>
    implements OrderMakesLike<H> {

    private OrderId = new TexchangeOrderIdStatic();
    private OpenOrder = new TexchangeOpenOrderStatic(this.context.H, this.OrderId);

    public constructor(
        protected readonly context: Context<H>,
        protected readonly models: OrderMakes.ModelDeps<H>,
        protected readonly broadcast: Broadcast<H>,
        protected readonly tasks: OrderMakes.TaskDeps<H>,
    ) { }

    public orderMakes(
        order: TexchangeOpenOrder<H>,
    ): void {
        const openMaker: TexchangeOpenMaker.MutablePlain<H> = {
            ...this.OpenOrder.copy(order),
            behind: this.context.H.from(0),
        };
        const makers = this.models.book.getBook()[order.side];
        for (const maker of makers)
            if (maker.price.eq(openMaker.price))
                // TODO addBehind()
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        this.models.makers.appendOrder(openMaker);
    }
}

export namespace OrderMakes {
    export interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
        makers: Makers<H>;
    }

    export interface TaskDeps<H extends HLike<H>> { }
}

import { inject } from 'injektor';
import {
    TexchangeOpenOrder,
    TexchangeOpenMaker,
    TexchangeOpenOrderStatic,
    TexchangeOrderIdStatic,
    HLike,
} from 'interfaces';
import { Context } from '../../context';
import { OrderMakesLike } from './order-makes-like';
import { Broadcast } from '../../broadcast';

import { Book } from '../../models.d/book';
import { Makers } from '../../models.d/makers/makers';


export class OrderMakes<H extends HLike<H>>
    implements OrderMakesLike<H> {
    public static TaskDeps = {};
    @inject(OrderMakes.TaskDeps)
    private tasks!: OrderMakes.TaskDeps<H>;

    private OrderId = new TexchangeOrderIdStatic();
    private OpenOrder = new TexchangeOpenOrderStatic(this.context.H, this.OrderId);

    public constructor(
        private context: Context<H>,
        private models: OrderMakes.ModelDeps<H>,
        private broadcast: Broadcast<H>,
    ) { }

    public orderMakes(
        order: TexchangeOpenOrder<H>,
    ): void {
        const $order: TexchangeOpenMaker<H> = {
            ...this.OpenOrder.copy(order),
            behind: this.context.H.from(0),
        };
        const makers = this.models.book.getBook()[order.side];
        for (const maker of makers)
            if (maker.price.eq($order.price))
                // TODO addBehind()
                $order.behind = $order.behind.plus(maker.quantity);
        this.models.makers.appendOrder($order);
    }
}

export namespace OrderMakes {
    export interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
        makers: Makers<H>;
    }

    export interface TaskDeps<H extends HLike<H>> { }
}

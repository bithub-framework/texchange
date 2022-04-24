import { instantInject } from 'injektor';
import { HLike } from 'interfaces';
import {
    OpenOrder,
    OpenOrderStatic,
    OpenMaker,
    OrderIdStatic,
} from '../../interfaces';

import { Context } from '../../context';
import { OrderMakesLike } from './order-makes-like';
import { Broadcast } from '../../broadcast';

import { Book } from '../../models.d/book';
import { Makers } from '../../models.d/makers/makers';


export class OrderMakes<H extends HLike<H>>
    implements OrderMakesLike<H> {
    public static TaskDeps = {};
    @instantInject(OrderMakes.TaskDeps)
    private tasks!: OrderMakes.TaskDeps<H>;

    private OrderId = new OrderIdStatic();
    private OpenOrder = new OpenOrderStatic(this.context.H, this.OrderId);

    public constructor(
        private context: Context<H>,
        private models: OrderMakes.ModelDeps<H>,
        private broadcast: Broadcast<H>,
    ) { }

    public orderMakes(
        order: OpenOrder<H>,
    ): void {
        const makers = this.models.book.getBook()[order.side];
        let behind = new this.context.H(0);
        for (const maker of makers)
            if (maker.price.eq(order.price))
                behind = behind.plus(maker.quantity);
        this.models.makers.appendOrder(order, behind);
    }
}

export namespace OrderMakes {
    export interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
        makers: Makers<H>;
    }

    export interface TaskDeps<H extends HLike<H>> { }
}

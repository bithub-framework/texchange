import {
    HLike,
    OpenOrder,
} from 'interfaces';

import { Context } from '../../context';
import { OrderMakesLike } from './order-makes-like';
import { Broadcast } from '../../broadcast';

import { Book } from '../../models.d/book';
import { Makers } from '../../models.d/makers/makers';


export class OrderMakes<H extends HLike<H>>
    implements OrderMakesLike<H> {

    public constructor(
        private tasks: OrderMakes.TaskDeps<H>,

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

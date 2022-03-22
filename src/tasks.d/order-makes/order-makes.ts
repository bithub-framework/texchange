import {
    TexchangeOpenOrder,
    TexchangeOpenMaker,
    HLike,
} from 'interfaces';
import { Context } from '../../context';
import { OrderMakesLike } from './order-makes-like';
import { Broadcast } from '../../broadcast';

import { Book } from '../../models.d/book';
import { Makers } from '../../models.d/makers';


export class OrderMakes<H extends HLike<H>>
    implements OrderMakesLike<H> {
    constructor(
        protected readonly context: Context<H>,
        protected readonly models: OrderMakes.ModelDeps<H>,
        protected readonly broadcast: Broadcast<H>,
        protected readonly tasks: OrderMakes.TaskDeps<H>,
    ) { }

    public orderMakes(
        openOrder: TexchangeOpenOrder<H>,
    ): void {
        const openMaker: TexchangeOpenMaker.MutablePlain<H> = {
            price: openOrder.price,
            quantity: openOrder.quantity,
            side: openOrder.side,
            length: openOrder.length,
            operation: openOrder.operation,
            filled: openOrder.filled,
            unfilled: openOrder.unfilled,
            id: openOrder.id,
            behind: this.context.H.from(0),
        };
        const makers = this.models.book.getBook()[openOrder.side];
        for (const maker of makers)
            if (maker.price.eq(openOrder.price))
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

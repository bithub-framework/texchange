import {
    TexchangeOpenOrder,
    TexchangeOpenMaker,
    HLike,
} from 'interfaces';
import { Context } from '../context';
import { Models } from '../models/models';
import { Task } from '../task';
import { Tasks, OrderMakesLike } from '../tasks/tasks';
import { Broadcast } from '../broadcast';


export class OrderMakes<H extends HLike<H>> extends Task<H>
    implements OrderMakesLike<H> {
    constructor(
        protected readonly context: Context<H>,
        protected readonly models: Models<H>,
        protected readonly broadcast: Broadcast<H>,
        protected readonly tasks: Tasks<H>,
    ) { super(); }

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

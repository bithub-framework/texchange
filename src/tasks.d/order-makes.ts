import {
    ConcreteOpenOrder,
    ConcreteOpenMaker,
    HLike,
} from 'interfaces';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, OrderMakesLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';


export class OrderMakes<H extends HLike<H>> extends Task<H>
    implements OrderMakesLike<H> {
    constructor(
        protected readonly context: Context<H>,
        protected readonly models: StatefulModels<H>,
        protected readonly broadcast: Broadcast<H>,
        protected readonly tasks: TasksLike<H>,
    ) { super(); }

    public orderMakes(
        openOrder: ConcreteOpenOrder<H>,
    ): void {
        const openMaker: ConcreteOpenMaker.MutablePlain<H> = {
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

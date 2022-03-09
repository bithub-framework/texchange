import {
    OpenOrder,
    OpenMaker,
} from 'interfaces';
import Big from 'big.js';
import { Context } from '../context';
import { ModelsStatic } from '../models/models-static';
import { Task } from '../task';
import { TasksLike, OrderMakesLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';


export class OrderMakes extends Task
    implements OrderMakesLike {
    constructor(
        protected readonly context: Context,
        protected readonly models: ModelsStatic,
        protected readonly broadcast: Broadcast,
        protected readonly tasks: TasksLike,
    ) { super(); }

    public orderMakes(
        openOrder: Readonly<OpenOrder>,
    ): void {
        const openMaker: OpenMaker = {
            price: openOrder.price,
            quantity: openOrder.quantity,
            side: openOrder.side,
            length: openOrder.length,
            operation: openOrder.operation,
            filled: openOrder.filled,
            unfilled: openOrder.unfilled,
            id: openOrder.id,
            behind: new Big(0),
        };
        const makers = this.models.book.getBook()[openOrder.side];
        for (const maker of makers)
            if (maker.price.eq(openOrder.price))
                // TODO addBehind()
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        this.models.makers.appendOrder(openMaker);
    }
}

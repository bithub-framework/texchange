import {
    OpenOrder,
    OpenMaker,
} from '../interfaces';
import Big from 'big.js';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';



export namespace OrderMakes {
    export type Involved = Pick<Models, 'book' | 'makers'>;
}
import Involved = OrderMakes.Involved;

export class OrderMakes {
    constructor(
        private context: Context,
        protected models: Involved,
    ) { }

    public involved: ModelLike[] = [
        this.models.book,
        this.models.makers,
    ];

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

        this.models.makers.stage = true;
        this.models.book.stage = true;
    }
}

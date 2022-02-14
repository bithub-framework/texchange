import {
    OpenOrder,
    OpenMaker,
} from '../interfaces';
import Big from 'big.js';
import { Context } from '../context/context';
import { Models } from '../models/models';



export class Making {
    constructor(
        private context: Context,
        private models: Models,
    ) { }

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
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        this.models.makers.appendOrder(openMaker);
    }
}

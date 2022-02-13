import {
    OpenOrder,
    OpenMaker,
} from '../interfaces';
import Big from 'big.js';
import { type Hub } from '../hub';


export class Making {
    constructor(private hub: Hub) { }

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
        const makers = this.hub.models.book.getBook()[openOrder.side];
        for (const maker of makers)
            if (maker.price.eq(openOrder.price))
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        this.hub.models.makers.appendOrder(openMaker);
    }
}

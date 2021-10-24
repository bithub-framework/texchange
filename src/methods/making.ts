import {
    OpenOrder,
    OpenMaker,
} from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';


export class MethodsMaking {
    constructor(
        private core: Core,
    ) { }

    public orderMakes(
        openOrder: OpenOrder,
    ): void {
        const { orderbook, margin, makers } = this.core.states;

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
        for (const maker of orderbook.getOrderbook()[openOrder.side])
            if (maker.price.eq(openOrder.price))
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        const toFreeze = makers.appendOrder(openMaker);
        margin.freeze(toFreeze);
    }
}

import {
    OpenOrder,
    OpenMaker,
} from '../interfaces';
import Big from 'big.js';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { type Stages } from '../scheduler';


export namespace Making {
    export type Involved = keyof Pick<Models, 'book' | 'makers'>;
}
import Involved = Making.Involved;

export class Making {
    public static involved: Involved[] = ['book', 'makers'];

    constructor(
        private context: Context,
        protected models: Pick<Models, Involved>,
        protected stages: Pick<Stages, Involved>,
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
                // TODO addBehind()
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        this.models.makers.appendOrder(openMaker);

        this.stages.makers = true;
        this.stages.book = true;
    }
}

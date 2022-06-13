import {
    HLike,
    OpenOrder,
} from 'secretary-like';

import { Context } from '../../context';
import { OrderMakesLike } from './order-makes-like';
import { Broadcast } from '../../broadcast';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';

import { Book } from '../../models.d/book';
import { Makers } from '../../models.d/makers/makers';


export class OrderMakes<H extends HLike<H>>
    implements OrderMakesLike<H>
{
    @instantInject(TYPES.Tasks)
    private tasks!: OrderMakes.TaskDeps<H>;

    public constructor(
        @inject(TYPES.Context)
        private context: Context<H>,
        @inject(TYPES.Models)
        private models: OrderMakes.ModelDeps<H>,
        @inject(TYPES.Broadcast)
        private broadcast: Broadcast<H>,
    ) { }

    public orderMakes(
        order: OpenOrder<H>,
    ): void {
        const makers = this.models.book.getBook()[order.side];
        let behind = new this.context.Data.H(0);
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

import {
    HLike,
    OpenOrder,
} from 'secretary-like';

import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { Book } from '../models.d/book';
import { Makers } from '../models.d/makers/makers';


export class TaskOrderMakes<H extends HLike<H>> {
    @instantInject(TYPES.Tasks)
    private tasks!: TaskOrderMakes.TaskDeps<H>;

    public constructor(
        @inject(TYPES.Context)
        private context: Context<H>,
        @inject(TYPES.Models)
        private models: TaskOrderMakes.ModelDeps<H>,
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

export namespace TaskOrderMakes {
    export interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
        makers: Makers<H>;
    }

    export interface TaskDeps<H extends HLike<H>> { }
}

import { Context } from '../context';
import {
    HLike,
    OpenOrder,
} from 'secretary-like';

import { Broadcast } from '../broadcast';

import { Book } from '../models.d/book';
import { TaskValidateOrder } from './validate-order';
import { TaskOrderTakes } from './order-takes';
import { TaskOrderMakes } from './order-makes';
import { TaskGetBalances } from './get-balances';
import { TaskGetPositions } from './get-positions';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


export class TaskMakeOpenOrder<H extends HLike<H>> {
    @instantInject(TYPES.tasks)
    private tasks!: TaskMakeOpenOrder.TaskDeps<H>;

    public constructor(
        @inject(TYPES.context)
        private context: Context<H>,
        @inject(TYPES.models)
        private models: TaskMakeOpenOrder.ModelDeps<H>,
        @inject(TYPES.broadcast)
        private broadcast: Broadcast<H>,
    ) { }

    public makeOpenOrder(order: OpenOrder<H>): OpenOrder<H> {
        this.tasks.validateOrder.validateOrder(order);
        const $order = this.context.Data.OpenOrder.copy(order);
        const trades = this.tasks.orderTakes.$orderTakes($order);
        this.tasks.orderMakes.orderMakes($order);
        if (trades.length) {
            this.broadcast.emit('trades', trades);
            this.broadcast.emit('orderbook', this.models.book.getBook());
            this.broadcast.emit('balances', this.tasks.getBalances.getBalances());
            this.broadcast.emit('positions', this.tasks.getPositions.getPositions());
        }
        return $order;
    }
}

export namespace TaskMakeOpenOrder {
    export interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
    }

    export interface TaskDeps<H extends HLike<H>> {
        validateOrder: TaskValidateOrder<H>;
        orderTakes: TaskOrderTakes<H>;
        orderMakes: TaskOrderMakes<H>;
        getBalances: TaskGetBalances<H>;
        getPositions: TaskGetPositions<H>;
    }
}

import { Context } from '../../context';
import {
    HLike,
    OpenOrder,
} from 'secretary-like';

import { MakeOpenOrderLike } from './make-open-order-like';
import { Broadcast } from '../../broadcast';

import { ValidateOrderLike } from '../validate-order/validate-order-like';
import { OrderTakesLike } from '../order-takes/order-takes-like';
import { OrderMakesLike } from '../order-makes/order-makes-like';
import { Book } from '../../models.d/book';
import { GetBalancesLike } from '../get-balances/get-balances-like';
import { GetPositionsLike } from '../get-positions/get-positions-like';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';


export class MakeOpenOrder<H extends HLike<H>>
    implements MakeOpenOrderLike<H>
{
    @instantInject(TYPES.Tasks)
    private tasks!: MakeOpenOrder.TaskDeps<H>;

    public constructor(
        @inject(TYPES.Context)
        private context: Context<H>,
        @inject(TYPES.Models)
        private models: MakeOpenOrder.ModelDeps<H>,
        @inject(TYPES.Broadcast)
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

export namespace MakeOpenOrder {
    export interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
    }

    export interface TaskDeps<H extends HLike<H>> {
        validateOrder: ValidateOrderLike<H>;
        orderTakes: OrderTakesLike<H>;
        orderMakes: OrderMakesLike<H>;
        getBalances: GetBalancesLike<H>;
        getPositions: GetPositionsLike<H>;
    }
}

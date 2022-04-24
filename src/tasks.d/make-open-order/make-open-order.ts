import { instantInject } from 'injektor';
import { Context } from '../../context';
import { HLike } from 'interfaces';
import {
    OpenOrder,
    OpenOrderStatic,
    OrderIdStatic,
} from '../../interfaces';

import { MakeOpenOrderLike } from './make-open-order-like';
import { Broadcast } from '../../broadcast';

import { ValidateOrderLike } from '../validate-order/validate-order-like';
import { OrderTakesLike } from '../order-takes/order-takes-like';
import { OrderMakesLike } from '../order-makes/order-makes-like';
import { Book } from '../../models.d/book';
import { GetBalancesLike } from '../get-balances/get-balances-like';
import { GetPositionsLike } from '../get-positions/get-positions-like';


export class MakeOpenOrder<H extends HLike<H>>
    implements MakeOpenOrderLike<H> {
    public static TaskDeps = {};
    @instantInject(MakeOpenOrder.TaskDeps)
    private tasks!: MakeOpenOrder.TaskDeps<H>;

    private OrderId = new OrderIdStatic();
    private OpenOrder = new OpenOrderStatic(this.context.H, this.OrderId);

    public constructor(
        private context: Context<H>,
        private models: MakeOpenOrder.ModelDeps<H>,
        private broadcast: Broadcast<H>,
    ) { }

    public makeOpenOrder(order: OpenOrder<H>): OpenOrder<H> {
        this.tasks.validateOrder.validateOrder(order);
        const $order = this.OpenOrder.copy(order);
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
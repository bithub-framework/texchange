import { Context } from '../../context/context';
import { TexchangeOpenOrder, HLike } from 'interfaces';
import { MakeOpenOrderLike } from './make-open-order-like';
import { Broadcast } from '../../broadcast';
import { ValidateOrderLike } from '../validate-order/validate-order-like';
import { OrderTakesLike } from '../order-takes/order-takes-like';
import { OrderMakesLike } from '../order-makes/order-makes-like';
import { Book } from '../../models.d/book';
import { GetBalancesLike } from '../get-balances/get-balances-like';
import { GetPositionsLike } from '../get-positions/get-positions-like';
export declare class MakeOpenOrder<H extends HLike<H>> implements MakeOpenOrderLike<H> {
    protected context: Context<H>;
    protected models: MakeOpenOrder.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: MakeOpenOrder.TaskDeps<H>;
    private OrderId;
    private OpenOrder;
    constructor(context: Context<H>, models: MakeOpenOrder.ModelDeps<H>, broadcast: Broadcast<H>, tasks: MakeOpenOrder.TaskDeps<H>);
    makeOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}
export declare namespace MakeOpenOrder {
    interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        validateOrder: ValidateOrderLike<H>;
        orderTakes: OrderTakesLike<H>;
        orderMakes: OrderMakesLike<H>;
        getBalances: GetBalancesLike<H>;
        getPositions: GetPositionsLike<H>;
    }
}

import { Context } from '../context';
import { LimitOrder, HLike, OpenOrder } from 'secretary-like';
import { Progress } from '../models.d/progress';
import { UserOrderHandler } from '../middlewares/user-order-handler';
export declare class UseCaseMakeOrder<H extends HLike<H>> {
    private context;
    private progress;
    private userOrderhandler;
    constructor(context: Context<H>, progress: Progress<H>, userOrderhandler: UserOrderHandler<H>);
    makeOrder(order: LimitOrder<H>): OpenOrder<H>;
}

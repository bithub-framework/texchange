import { Context } from '../context';
import { LimitOrder, HLike, OpenOrder } from 'secretary-like';
import { Progress } from '../models.d/progress';
import { Book } from '../models.d/book';
import { UserOrderHandler } from '../middlewares/user-order-handler';
import { OrderValidator } from '../middlewares/order-validator';
import { Broadcast } from '../middlewares/broadcast';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';
export declare class UseCaseMakeOrder<H extends HLike<H>> {
    private context;
    private progress;
    private book;
    private userOrderhandler;
    private validator;
    private broadcast;
    private calculator;
    constructor(context: Context<H>, progress: Progress<H>, book: Book<H>, userOrderhandler: UserOrderHandler<H>, validator: OrderValidator<H>, broadcast: Broadcast<H>, calculator: AvailableAssetsCalculator<H>);
    makeOrder(limitOrder: LimitOrder<H>): OpenOrder<H>;
}

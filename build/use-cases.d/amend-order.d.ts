import { HLike, Amendment, OpenOrder } from 'secretary-like';
import { Context } from '../context';
import { Book } from '../models.d/book';
import { Makers } from '../models.d/makers/makers';
import { UserOrderHandler } from '../middlewares/user-order-handler';
import { OrderValidator } from '../middlewares/order-validator';
import { Broadcast } from '../middlewares/broadcast';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';
export declare class UseCaseAmendOrder<H extends HLike<H>> {
    private context;
    private book;
    private makers;
    private userOrderHandler;
    private validator;
    private broadcast;
    private calculator;
    constructor(context: Context<H>, book: Book<H>, makers: Makers<H>, userOrderHandler: UserOrderHandler<H>, validator: OrderValidator<H>, broadcast: Broadcast<H>, calculator: AvailableAssetsCalculator<H>);
    amendOrder(amendment: Amendment<H>): OpenOrder<H>;
}

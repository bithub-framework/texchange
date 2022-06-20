import { HLike, Amendment, OpenOrder } from 'secretary-like';
import { UserOrderHandler } from '../middlewares/user-order-handler';
export declare class UseCaseAmendOrder<H extends HLike<H>> {
    private userOrderHandler;
    constructor(userOrderHandler: UserOrderHandler<H>);
    amendOrder(amendment: Amendment<H>): OpenOrder<H>;
}

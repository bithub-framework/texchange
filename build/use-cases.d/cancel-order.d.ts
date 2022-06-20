import { HLike, OpenOrder } from 'secretary-like';
import { UserOrderHandler } from '../middlewares/user-order-handler';
export declare class UseCaseCancelOrder<H extends HLike<H>> {
    private userOrderHandler;
    constructor(userOrderHandler: UserOrderHandler<H>);
    cancelOrder(order: OpenOrder<H>): OpenOrder<H>;
}

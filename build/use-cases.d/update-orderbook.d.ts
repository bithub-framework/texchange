import { Context } from '../context';
import { Broadcast } from '../middlewares/broadcast';
import { HLike } from 'secretary-like';
import { DatabaseOrderbook } from '../interfaces/database-orderbook';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Makers } from '../models.d/makers/makers';
import { UserOrderHandler } from '../middlewares/user-order-handler';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';
export declare class UseCaseUpdateOrderbook<H extends HLike<H>> {
    protected context: Context<H>;
    protected book: Book<H>;
    protected progress: Progress<H>;
    protected makers: Makers<H>;
    protected userOrderHandler: UserOrderHandler<H>;
    protected broadcast: Broadcast<H>;
    private calculator;
    constructor(context: Context<H>, book: Book<H>, progress: Progress<H>, makers: Makers<H>, userOrderHandler: UserOrderHandler<H>, broadcast: Broadcast<H>, calculator: AvailableAssetsCalculator<H>);
    updateOrderbook(orderbook: DatabaseOrderbook<H>): void;
}

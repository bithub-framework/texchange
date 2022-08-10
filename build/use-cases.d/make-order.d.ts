import { VirtualMachineContextLike } from '../vmctx';
import { LimitOrder, HLike, OpenOrder } from 'secretary-like';
import { Progress } from '../models.d/progress';
import { Book } from '../models.d/book';
import { Makers } from '../models.d/makers/makers';
import { OrderValidator } from '../middlewares/order-validator';
import { Broadcast } from '../middlewares/broadcast';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';
import { Matcher } from '../middlewares/matcher';
export declare class UseCaseMakeOrder<H extends HLike<H>> {
    private vmctx;
    private progress;
    private book;
    private makers;
    private validator;
    private broadcast;
    private calculator;
    private matcher;
    constructor(vmctx: VirtualMachineContextLike<H>, progress: Progress<H>, book: Book<H>, makers: Makers<H>, validator: OrderValidator<H>, broadcast: Broadcast<H>, calculator: AvailableAssetsCalculator<H>, matcher: Matcher<H>);
    makeOrder(limitOrder: LimitOrder<H>): OpenOrder<H>;
}

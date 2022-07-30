import { HLike, Amendment, OpenOrder } from 'secretary-like';
import { VirtualMachineContextLike } from '../vmctx';
import { Book } from '../models.d/book';
import { Makers } from '../models.d/makers/makers';
import { OrderValidator } from '../middlewares/order-validator';
import { Broadcast } from '../middlewares/broadcast';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';
import { Matcher } from '../middlewares/matcher';
export declare class UseCaseAmendOrder<H extends HLike<H>> {
    private context;
    private book;
    private makers;
    private validator;
    private broadcast;
    private calculator;
    private matcher;
    constructor(context: VirtualMachineContextLike<H>, book: Book<H>, makers: Makers<H>, validator: OrderValidator<H>, broadcast: Broadcast<H>, calculator: AvailableAssetsCalculator<H>, matcher: Matcher<H>);
    amendOrder(amendment: Amendment<H>): OpenOrder<H>;
}

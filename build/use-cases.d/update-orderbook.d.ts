import { VirtualMachineContextLike } from '../vmctx';
import { Broadcast } from '../middlewares/broadcast';
import { HLike } from 'secretary-like';
import { DatabaseOrderbook } from '../data-types/database-orderbook';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Makers } from '../models.d/makers/makers';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';
import { Matcher } from '../middlewares/matcher';
export declare class UseCaseUpdateOrderbook<H extends HLike<H>> {
    private vmctx;
    private book;
    private progress;
    private makers;
    private broadcast;
    private calculator;
    private matcher;
    constructor(vmctx: VirtualMachineContextLike<H>, book: Book<H>, progress: Progress<H>, makers: Makers<H>, broadcast: Broadcast<H>, calculator: AvailableAssetsCalculator<H>, matcher: Matcher<H>);
    updateOrderbook(orderbook: DatabaseOrderbook<H>): void;
}

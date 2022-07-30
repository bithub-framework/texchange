import { HLike, OpenOrderLike, TradeLike, MarketSpecLike, AccountSpecLike } from 'secretary-like';
import { VirtualMachineContextLike } from '../vmctx';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { MarginAssets } from '../models.d/margin-assets';
export declare class Matcher<H extends HLike<H>> {
    private context;
    private marketSpec;
    private accountSpec;
    private book;
    private marginAssets;
    private progress;
    constructor(context: VirtualMachineContextLike<H>, marketSpec: MarketSpecLike<H>, accountSpec: AccountSpecLike, book: Book<H>, marginAssets: MarginAssets<H>, progress: Progress<H>);
    $match($taker: OpenOrderLike<H>): TradeLike<H>[];
}

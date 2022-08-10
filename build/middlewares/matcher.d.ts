import { HLike, OpenOrder, Trade, MarketSpec, AccountSpec } from 'secretary-like';
import { VirtualMachineContextLike } from '../vmctx';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { MarginAssets } from '../models.d/margin-assets';
export declare class Matcher<H extends HLike<H>> {
    private vmctx;
    private marketSpec;
    private accountSpec;
    private book;
    private marginAssets;
    private progress;
    constructor(vmctx: VirtualMachineContextLike<H>, marketSpec: MarketSpec<H>, accountSpec: AccountSpec, book: Book<H>, marginAssets: MarginAssets<H>, progress: Progress<H>);
    $match($taker: OpenOrder<H>): Trade<H>[];
}

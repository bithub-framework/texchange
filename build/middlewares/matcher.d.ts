import { HLike, OpenOrder, Trade } from 'secretary-like';
import { Context } from '../context';
import { MarketSpec } from 'secretary-like';
import { AccountSpec } from 'secretary-like';
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
    constructor(context: Context<H>, marketSpec: MarketSpec<H>, accountSpec: AccountSpec, book: Book<H>, marginAssets: MarginAssets<H>, progress: Progress<H>);
    $match($taker: OpenOrder<H>): Trade<H>[];
}

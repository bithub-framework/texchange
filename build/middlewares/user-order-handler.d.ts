import { HLike, OpenOrder, Trade } from 'secretary-like';
import { Context } from '../context';
import { MarketSpec } from 'secretary-like';
import { AccountSpec } from 'secretary-like';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { MarginAssets } from '../models.d/margin-assets';
import { Makers } from '../models.d/makers/makers';
export declare class UserOrderHandler<H extends HLike<H>> {
    private context;
    private marketSpec;
    private accountSpec;
    private book;
    private marginAssets;
    private progress;
    private makers;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>, accountSpec: AccountSpec, book: Book<H>, marginAssets: MarginAssets<H>, progress: Progress<H>, makers: Makers<H>);
    $makeOpenOrder($order: OpenOrder<H>): Trade<H>[];
    private $orderTakes;
    private orderMakes;
}

import { HLike, Trade, MarketSpecLike, AccountSpecLike } from 'secretary-like';
import { Context } from '../context';
import { Makers } from '../models.d/makers/makers';
import { MarginAssets } from '../models.d/margin-assets';
export declare class DatabaseTradeHandler<H extends HLike<H>> {
    private context;
    private marketSpec;
    private accountSpec;
    private marginAssets;
    private makers;
    constructor(context: Context<H>, marketSpec: MarketSpecLike<H>, accountSpec: AccountSpecLike, marginAssets: MarginAssets<H>, makers: Makers<H>);
    tradeTakesOpenMakers(trade: Trade<H>): void;
    private $tradeShouldTakeOpenOrder;
    private $tradeTakesOrderQueue;
    private $tradeTakesOpenMaker;
}

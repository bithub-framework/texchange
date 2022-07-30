import { HLike, TradeLike, MarketSpecLike, AccountSpecLike } from 'secretary-like';
import { VirtualMachineContextLike } from '../vmctx';
import { Makers } from '../models.d/makers/makers';
import { MarginAssets } from '../models.d/margin-assets';
export declare class DatabaseTradeHandler<H extends HLike<H>> {
    private context;
    private marketSpec;
    private accountSpec;
    private marginAssets;
    private makers;
    constructor(context: VirtualMachineContextLike<H>, marketSpec: MarketSpecLike<H>, accountSpec: AccountSpecLike, marginAssets: MarginAssets<H>, makers: Makers<H>);
    tradeTakesOpenMakers(trade: TradeLike<H>): void;
    private $tradeShouldTakeOpenOrder;
    private $tradeTakesOrderQueue;
    private $tradeTakesOpenMaker;
}

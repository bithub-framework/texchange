import { HLike, Trade, MarketSpec, AccountSpec } from 'secretary-like';
import { VirtualMachineContextLike } from '../vmctx';
import { Makers } from '../models.d/makers/makers';
import { MarginAssets } from '../models.d/margin-assets';
export declare class DatabaseTradeHandler<H extends HLike<H>> {
    private vMCTX;
    private marketSpec;
    private accountSpec;
    private marginAssets;
    private makers;
    constructor(vMCTX: VirtualMachineContextLike<H>, marketSpec: MarketSpec<H>, accountSpec: AccountSpec, marginAssets: MarginAssets<H>, makers: Makers<H>);
    tradeTakesOpenMakers(trade: Trade<H>): void;
    private $tradeShouldTakeOpenOrder;
    private $tradeTakesOrderQueue;
    private $tradeTakesOpenMaker;
}

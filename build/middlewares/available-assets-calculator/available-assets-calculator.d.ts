import { HLike, Balances, Positions, Position, MarketSpec } from 'secretary-like';
import { VirtualMachineContextLike } from '../../vmctx';
import { MarginAssets } from '../../models.d/margin-assets';
import { Makers } from '../../models.d/makers/makers';
export declare abstract class AvailableAssetsCalculator<H extends HLike<H>> {
    protected vMCTX: VirtualMachineContextLike<H>;
    protected marketSpec: MarketSpec<H>;
    protected marginAssets: MarginAssets<H>;
    protected makers: Makers<H>;
    constructor(vMCTX: VirtualMachineContextLike<H>, marketSpec: MarketSpec<H>, marginAssets: MarginAssets<H>, makers: Makers<H>);
    getAvailable(): H;
    protected abstract getFinalFrozenBalance(): H;
    getClosable(): Position<H>;
    getBalances(): Balances<H>;
    getPositions(): Positions<H>;
}

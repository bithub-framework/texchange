import { HLike, BalancesLike, PositionsLike, PositionLike, MarketSpecLike } from 'secretary-like';
import { VirtualMachineContextLike } from '../../vmctx';
import { MarginAssets } from '../../models.d/margin-assets';
import { Makers } from '../../models.d/makers/makers';
export declare abstract class AvailableAssetsCalculator<H extends HLike<H>> {
    protected context: VirtualMachineContextLike<H>;
    protected marketSpec: MarketSpecLike<H>;
    protected marginAssets: MarginAssets<H>;
    protected makers: Makers<H>;
    constructor(context: VirtualMachineContextLike<H>, marketSpec: MarketSpecLike<H>, marginAssets: MarginAssets<H>, makers: Makers<H>);
    getAvailable(): H;
    protected abstract getFinalFrozenBalance(): H;
    getClosable(): PositionLike<H>;
    getBalances(): BalancesLike<H>;
    getPositions(): PositionsLike<H>;
}

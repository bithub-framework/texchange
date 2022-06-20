import { HLike, Closable, Balances, Positions } from 'secretary-like';
import { Context } from '../../context';
import { MarginAssets } from '../../models.d/margin-assets';
import { Makers } from '../../models.d/makers/makers';
import { MarketSpec } from 'secretary-like';
export declare abstract class AvailableAssetsCalculator<H extends HLike<H>> {
    protected context: Context<H>;
    protected marketSpec: MarketSpec<H>;
    protected marginAssets: MarginAssets<H>;
    protected makers: Makers<H>;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>, marginAssets: MarginAssets<H>, makers: Makers<H>);
    getAvailable(): H;
    protected abstract getFinalFrozenBalance(): H;
    getClosable(): Closable<H>;
    getBalances(): Balances<H>;
    getPositions(): Positions<H>;
}

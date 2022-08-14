import { Container as BaseContainer } from '../container';
import { TYPES } from './types';
import { HLike, MarketSpec, AccountSpec } from 'secretary-like';
import { Makers } from '../../models.d/makers/makers';
import { Pricing } from '../../models.d/pricing/pricing';
import { MarginAssets } from '../../models.d/margin-assets';
import { AvailableAssetsCalculator } from '../../middlewares/available-assets-calculator/available-assets-calculator';
import { Mtm } from '../../mark-to-market/mtm';
import { LatencyConfig as DelayConfig } from '../../facades.d/latency-config';
export declare abstract class Container<H extends HLike<H>> extends BaseContainer<H> {
    [TYPES.marketSpec]: () => MarketSpec<H>;
    [TYPES.accountSpec]: () => AccountSpec;
    abstract [TYPES.MODELS.initialBalance]: () => H;
    [TYPES.MODELS.makers]: () => Makers<H>;
    [TYPES.MODELS.pricing]: () => Pricing<H, any>;
    abstract [TYPES.MODELS.initialSettlementPrice]: () => H;
    [TYPES.MODELS.marginAssets]: () => MarginAssets<H>;
    [TYPES.MIDDLEWARES.availableAssetsCalculator]: () => AvailableAssetsCalculator<H>;
    [TYPES.mtm]: () => Mtm<H> | null;
    [TYPES.FACADES.config]: () => DelayConfig;
}

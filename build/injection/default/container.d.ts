import { Container as BaseContainer } from '../container';
import { TYPES } from './types';
import { HLike, HStatic, HFactory, TimelineLike, MarketSpecLike, AccountSpecLike } from 'secretary-like';
import { Makers } from '../../models.d/makers/makers';
import { Pricing } from '../../models.d/pricing/pricing';
import { MarginAssets } from '../../models.d/margin-assets';
import { AvailableAssetsCalculator } from '../../middlewares/available-assets-calculator/available-assets-calculator';
import { Mtm } from '../../mark-to-market/mtm';
import { Config as DelayConfig } from '../../facades.d/config';
export declare class Container<H extends HLike<H>> extends BaseContainer<H> {
    [TYPES.hStatic]: () => HStatic<H>;
    [TYPES.hFactory]: () => HFactory<H>;
    [TYPES.marketSpec]: () => MarketSpecLike<H>;
    [TYPES.accountSpec]: () => AccountSpecLike;
    [TYPES.timeline]: () => TimelineLike;
    [TYPES.MODELS.initialBalance]: () => H;
    [TYPES.MODELS.makers]: () => Makers<H>;
    [TYPES.MODELS.pricing]: () => Pricing<H, any>;
    [TYPES.MODELS.marginAssets]: () => MarginAssets<H>;
    [TYPES.MIDDLEWARES.availableAssetsCalculator]: () => AvailableAssetsCalculator<H>;
    [TYPES.mtm]: () => Mtm<H> | null;
    [TYPES.FACADES.config]: () => DelayConfig;
    constructor(timeline: TimelineLike, hFactory: HFactory<H>, H: HStatic<H>, initialBalance: H, initialSettlementPrice: H);
}

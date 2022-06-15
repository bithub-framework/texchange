import { HLike, HStatic } from 'secretary-like';
import { Container as BaseContainer } from '../container';
import { TYPES } from '../types';
import { Spec } from '../../context.d/spec';
import { TimelineLike, MarketCalc } from 'secretary-like';
import { Makers } from '../../models.d/makers/makers';
import { Pricing } from '../../models.d/pricing/pricing';
import { TaskGetAvailable } from '../../tasks.d/get-available/get-available';
import { TaskMarginAccumulation } from '../../tasks.d/margin-accumulation/margin-accumulation';
import { TaskSettle } from '../../tasks.d/settle/settle';
import { Mtm } from '../../mark-to-market/mtm';
import { Config as DelayConfig } from '../../facades.d/config';
export declare class Container<H extends HLike<H>> extends BaseContainer<H> {
    [TYPES.hStatic]: () => HStatic<H>;
    [TYPES.spec]: () => Spec<H>;
    [TYPES.timeline]: () => TimelineLike;
    [TYPES.marketCalc]: () => MarketCalc<H>;
    [TYPES.MODELS.makers]: () => Makers<H>;
    [TYPES.MODELS.pricing]: () => Pricing<H, any>;
    [TYPES.TASKS.getAvailable]: () => TaskGetAvailable<H>;
    [TYPES.TASKS.marginAccumulation]: () => TaskMarginAccumulation<H>;
    [TYPES.TASKS.settle]: () => TaskSettle<H>;
    [TYPES.mtm]: () => Mtm<H>;
    [TYPES.USE_CASES.realTimeSettlement]: () => boolean;
    [TYPES.FACADES.config]: () => DelayConfig;
    constructor(timeline: TimelineLike, H: HStatic<H>, spec: Spec<H>);
}

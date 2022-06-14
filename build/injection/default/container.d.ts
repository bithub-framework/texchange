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
export declare class Container<H extends HLike<H>> extends BaseContainer<H> {
    [TYPES.HStatic]: () => HStatic<H>;
    [TYPES.spec]: () => Spec<H>;
    [TYPES.TimelineLike]: () => TimelineLike;
    [TYPES.MarketCalc]: () => MarketCalc<H>;
    [TYPES.MODELS.Makers]: () => Makers<H>;
    [TYPES.MODELS.Pricing]: () => Pricing<H, any>;
    [TYPES.TASKS.GetAvailable]: () => TaskGetAvailable<H>;
    [TYPES.TASKS.MarginAccumulation]: () => TaskMarginAccumulation<H>;
    [TYPES.TASKS.Settle]: () => TaskSettle<H>;
    [TYPES.Mtm]: () => Mtm<H>;
    [TYPES.USE_CASES.realTimeSettlement]: () => boolean;
    constructor(timeline: TimelineLike, H: HStatic<H>, spec: Spec<H>);
}

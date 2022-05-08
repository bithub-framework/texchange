import { HLike } from 'secretary-like';
import { Container as BaseContainer } from './base-container';
import { TYPES } from './types';
import { MarketCalc } from 'secretary-like';
import { Makers } from '../models.d/makers/makers';
import { Pricing } from '../models.d/pricing/pricing';
import { Tasks } from '../tasks/tasks';
import { Mtm } from '../mark-to-market/mtm';
import { UpdateTrades } from '../use-cases.d/update-trades';
export declare class Container<H extends HLike<H>> extends BaseContainer<H> {
    [TYPES.MarketCalc]: () => MarketCalc<H>;
    [TYPES.Makers]: () => Makers<H>;
    [TYPES.Pricing]: () => Pricing<H, any>;
    [TYPES.Mtm]: () => Mtm<H>;
    [TYPES.Tasks]: () => Tasks<H>;
    [TYPES.UpdateTrades]: () => UpdateTrades<H>;
}

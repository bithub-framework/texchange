import { HLike, MarketCalc, Timeline, HStatic } from 'interfaces';
import { Config } from './context.d/config';
export interface Context<H extends HLike<H>> {
    calc: MarketCalc<H>;
    config: Config<H>;
    timeline: Timeline;
    H: HStatic<H>;
}

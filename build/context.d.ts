import { HLike, MarketCalc, Timeline, HStatic } from 'interfaces';
import { Config } from './context.d/config';
export declare class Context<H extends HLike<H>> {
    config: Config<H>;
    timeline: Timeline;
    H: HStatic<H>;
    calc: MarketCalc<H>;
    constructor(config: Config<H>, timeline: Timeline, H: HStatic<H>);
}

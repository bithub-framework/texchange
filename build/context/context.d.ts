import { Config } from '../context.d/config';
import { Timeline, MarketCalc, HStatic, HLike } from 'interfaces';
export declare abstract class Context<H extends HLike<H>> {
    config: Config<H>;
    timeline: Timeline;
    H: HStatic<H>;
    abstract calc: MarketCalc<H>;
    constructor(config: Config<H>, timeline: Timeline, H: HStatic<H>);
}

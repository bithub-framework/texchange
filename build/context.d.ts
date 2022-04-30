import { HLike, MarketCalc, TimelineLike, HStatic } from 'interfaces';
import { Config } from './context.d/config';
export declare class Context<H extends HLike<H>> {
    calc: MarketCalc<H>;
    config: Config<H>;
    timeline: TimelineLike;
    H: HStatic<H>;
    constructor(calc: MarketCalc<H>, config: Config<H>, timeline: TimelineLike, H: HStatic<H>);
}

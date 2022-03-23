import { Config } from '../context.d/config';
import { Timeline, MarketCalc } from 'interfaces';
import { HStatic, HLike } from 'interfaces';
export declare abstract class Context<H extends HLike<H>> {
    readonly config: Config<H>;
    readonly timeline: Timeline;
    readonly H: HStatic<H>;
    abstract calc: MarketCalc<H>;
    constructor(config: Config<H>, timeline: Timeline, H: HStatic<H>);
}

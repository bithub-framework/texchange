import { HLike, MarketCalc } from 'secretary-like';
import { TimelineLike } from 'timeline';
import { Config } from './context.d/config';
import { DataStatic } from './interfaces/data';
export declare class Context<H extends HLike<H>> {
    calc: MarketCalc<H>;
    config: Config<H>;
    timeline: TimelineLike;
    Data: DataStatic<H>;
    constructor(calc: MarketCalc<H>, config: Config<H>, timeline: TimelineLike, Data: DataStatic<H>);
}

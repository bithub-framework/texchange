import { HLike, MarketCalc, TimelineLike } from 'secretary-like';
import { Spec } from './context.d/spec';
import { DataStatic } from './interfaces/data';
export declare class Context<H extends HLike<H>> {
    calc: MarketCalc<H>;
    spec: Spec<H>;
    timeline: TimelineLike;
    Data: DataStatic<H>;
    constructor(calc: MarketCalc<H>, spec: Spec<H>, timeline: TimelineLike, Data: DataStatic<H>);
}

import { Context } from './context';
import { HLike, MarketCalc } from 'interfaces';
export declare class DefaultContext<H extends HLike<H>> extends Context<H> {
    calc: MarketCalc<H>;
}

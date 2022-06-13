import { HLike } from 'secretary-like';
import { Context } from '../../context';
import { Instant } from '../instant';
import { Config } from './config';
import { MarketLatency } from './market';
import { AccountLatency } from './account';
export declare class Latency<H extends HLike<H>> {
    market: MarketLatency<H>;
    account: AccountLatency<H>;
    constructor(context: Context<H>, useCases: Latency.UseCaseDeps<H>, instant: Instant<H>, config: Config);
}
export declare namespace Latency {
    interface UseCaseDeps<H extends HLike<H>> extends MarketLatency.UseCaseDeps<H>, AccountLatency.UseCaseDeps<H> {
    }
}

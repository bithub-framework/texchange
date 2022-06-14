import { MarketApiLike, MarketSpec, HLike, MarketEventEmitterLike } from 'secretary-like';
import { Context } from '../../context';
import { Config } from './config';
import { UseCaseSubscription } from '../../use-cases.d/subscription';
export declare class MarketLatency<H extends HLike<H>> implements MarketApiLike<H> {
    private context;
    private useCases;
    private config;
    spec: MarketSpec<H>;
    events: MarketEventEmitterLike<H>;
    constructor(context: Context<H>, useCases: MarketLatency.UseCaseDeps<H>, config: Config);
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
}
export declare namespace MarketLatency {
    interface UseCaseDeps<H extends HLike<H>> {
        subscription: UseCaseSubscription<H>;
    }
}

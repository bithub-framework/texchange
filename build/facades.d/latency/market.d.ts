import { MarketApiLike, MarketSpec, HLike } from 'interfaces';
import { TradeId, OrderId, MarketEventEmitterLike } from '../../interfaces';
import { Context } from '../../context';
import { Subscription } from '../../use-cases.d/subscription';
export declare class MarketLatency<H extends HLike<H>> implements MarketApiLike<H, OrderId, TradeId> {
    private context;
    private useCases;
    spec: MarketSpec<H>;
    events: MarketEventEmitterLike<H>;
    private Orderbook;
    private TradeId;
    private Trade;
    constructor(context: Context<H>, useCases: Latency.UseCaseDeps<H>);
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
}
export declare namespace Latency {
    interface UseCaseDeps<H extends HLike<H>> {
        subscription: Subscription<H>;
    }
}

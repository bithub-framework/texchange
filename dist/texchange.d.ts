import { ManagingAssets } from './managing-assets';
import { Assets, LimitOrder, OrderId, RawTrade, ContextMarketPublicApiLike, ContextAccountPrivateApiLike } from './interfaces';
declare class Texchange extends ManagingAssets implements ContextMarketPublicApiLike, ContextAccountPrivateApiLike {
    private sleep;
    constructor(assets: Assets, sleep: (ms: number) => Promise<void>, now: () => number);
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    getAssets(): Promise<Assets>;
    protected pushOrderbook(): Promise<void>;
    protected pushRawTrades(rawTrades: RawTrade[]): Promise<void>;
}
export { Texchange as default, Texchange, };

import { ManagingAssets } from './4-assets';
import { Assets, LimitOrder, OrderId, UnidentifiedTrade, ContextMarketPublicApiLike, ContextAccountPrivateApiLike, Config, OpenOrder } from './interfaces';
declare class Texchange extends ManagingAssets implements ContextMarketPublicApiLike, ContextAccountPrivateApiLike {
    private sleep;
    constructor(config: Config, sleep: (ms: number) => Promise<void>, now: () => number);
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    getAssets(): Promise<Assets>;
    getOpenOrders(): Promise<OpenOrder[]>;
    protected pushOrderbook(): Promise<void>;
    protected pushNoidTrades(noidTrades: UnidentifiedTrade[]): Promise<void>;
}
export { Texchange as default, Texchange, };

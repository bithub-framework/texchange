import { ManagingAssets } from './managing-assets';
import { Assets, LimitOrder, OrderId, RawTrade } from './interfaces';
declare class Texchange extends ManagingAssets {
    private sleep;
    constructor(assets: Assets, sleep: (ms: number) => Promise<void>, now: () => number);
    makeLimitOrder(order: LimitOrder, open?: boolean): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    protected pushOrderbook(): Promise<void>;
    protected pushRawTrades(rawTrades: RawTrade[]): Promise<void>;
}
export { Texchange as default, Texchange, };

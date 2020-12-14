import { MakingOrder } from './making-order';
import { Assets, LimitOrder, OrderId, RawTrade } from './interfaces';
declare class ManagingAssets extends MakingOrder {
    private assets;
    private settlementPrice;
    constructor(assets: Assets, now: () => number);
    makeLimitOrder(order: LimitOrder, open?: boolean): Promise<OrderId>;
    updateTrades(rawTrades: RawTrade[]): void;
    private settle;
    private calcAssets;
}
export { ManagingAssets as default, ManagingAssets, };

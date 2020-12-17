import { MakingOrder } from './making-order';
import { Assets, LimitOrder, OrderId, RawTrade, Side } from './interfaces';
declare class ManagingAssets extends MakingOrder {
    private assets;
    private settlementPrice;
    constructor(assets: Assets, now: () => number);
    protected openPosition(side: Side, volume: number, dollarVolume: number): void;
    protected closePosition(side: Side, volume: number, dollarVolume: number): void;
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    getAssets(): Promise<Assets>;
    updateTrades(rawTrades: RawTrade[]): void;
    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade): void;
    private settle;
    private resetMargin;
}
export { ManagingAssets as default, ManagingAssets, };

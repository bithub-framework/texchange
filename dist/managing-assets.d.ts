import { MakingOrder } from './making-order';
import { Assets, LimitOrder, OrderId, RawTrade, Side, Config } from './interfaces';
declare class ManagingAssets extends MakingOrder {
    protected config: Config;
    private settlementPrice;
    private assets;
    constructor(config: Config, now: () => number);
    protected openPosition(side: Side, volume: number, dollarVolume: number): void;
    protected closePosition(side: Side, volume: number, dollarVolume: number): void;
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    getAssets(): Promise<Assets>;
    updateTrades(rawTrades: RawTrade[]): void;
    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade): void;
    private settle;
    private calcMargin;
}
export { ManagingAssets as default, ManagingAssets, };

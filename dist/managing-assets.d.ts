import { MakingOrder } from './making-order';
import { Assets, LimitOrder, OrderId, RawTrade, Config, OpenOrder, Length } from './interfaces';
declare class ManagingAssets extends MakingOrder {
    protected config: Config;
    private settlementPrice;
    private assets;
    constructor(config: Config, now: () => number);
    protected openPosition(length: Length, volume: number, dollarVolume: number): void;
    protected closePosition(length: Length, volume: number, dollarVolume: number): void;
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    getAssets(): Promise<Assets>;
    updateTrades(rawTrades: RawTrade[]): void;
    protected orderMakes(order: LimitOrder): OpenOrder;
    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade): void;
    private settle;
    private calcMargin;
}
export { ManagingAssets as default, ManagingAssets, };

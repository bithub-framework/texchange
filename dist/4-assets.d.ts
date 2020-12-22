import { Taken } from './3-taken';
import { Assets, LimitOrder, OrderId, RawTrade, Config, OpenOrder } from './interfaces';
declare class ManagingAssets extends Taken {
    private settlementPrice;
    private assetsManager;
    constructor(config: Config, now: () => number);
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    getAssets(): Promise<Assets>;
    updateTrades(rawTrades: RawTrade[]): void;
    private enoughReserve;
    protected orderMakes(order: LimitOrder): OpenOrder;
    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade): void;
    private settle;
}
export { ManagingAssets as default, ManagingAssets, };

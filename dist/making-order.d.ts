import { Pushing } from './pushing';
import { OpenOrder, LimitOrder, OrderId, RawTrade } from './interfaces';
declare class MakingOrder extends Pushing {
    private orderCount;
    protected openOrders: Map<import("interfaces/dist/data").TradeId, OpenOrder>;
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    getOpenOrders(): Promise<OpenOrder[]>;
    protected rawTradeShouldTakeOpenOrder(rawTrade: RawTrade, maker: OpenOrder): boolean;
    protected rawTradeTakesOpenOrder(rawTrade: RawTrade, maker: OpenOrder): number;
    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade): void;
    updateTrades(rawTrades: RawTrade[]): void;
    protected orderTakes(order: LimitOrder): [
        LimitOrder,
        RawTrade[],
        number,
        number
    ];
    protected orderMakes(order: LimitOrder): OpenOrder;
}
export { MakingOrder as default, MakingOrder, };

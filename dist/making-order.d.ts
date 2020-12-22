import { Pushing } from './pushing';
import { OpenOrder, LimitOrder, OrderId, RawTrade } from './interfaces';
import Big from 'big.js';
declare class MakingOrder extends Pushing {
    protected orderCount: number;
    protected openOrders: Map<import("interfaces/dist/data").TradeId, OpenOrder>;
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    getOpenOrders(): Promise<OpenOrder[]>;
    protected rawTradeShouldTakeOpenOrder(rawTrade: RawTrade, maker: OpenOrder): boolean;
    protected rawTradeTakesOpenOrder(rawTrade: RawTrade, maker: OpenOrder): [Big, Big];
    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade): void;
    updateTrades(rawTrades: RawTrade[]): void;
    protected orderTakes(_taker: LimitOrder): [
        LimitOrder,
        RawTrade[],
        Big,
        Big
    ];
    protected orderMakes(order: LimitOrder): OpenOrder;
}
export { MakingOrder as default, MakingOrder, };

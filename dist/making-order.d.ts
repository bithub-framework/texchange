import { Pushing } from './pushing';
import { OpenOrder, LimitOrder, OrderId, MakerOrder, RawTrade } from './interfaces';
declare class MakingOrder extends Pushing {
    private orderCount;
    private openOrders;
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    protected rawTradeTakes(_rawTrade: RawTrade): void;
    updateTrades(rawTrades: RawTrade[]): void;
    protected orderTakes(order: LimitOrder): [
        MakerOrder,
        RawTrade[],
        number,
        number
    ];
    protected orderMakes(order: MakerOrder): OpenOrder;
}
export { MakingOrder as default, MakingOrder, };

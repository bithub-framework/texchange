import { Taken } from './3-taken';
import { Assets, LimitOrder, OrderId, RawTrade, Config, OpenOrder } from './interfaces';
import Big from 'big.js';
declare class ManagingAssets extends Taken {
    private settlementPrice;
    private assetsManager;
    constructor(config: Config, now: () => number);
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    getAssets(): Promise<Assets>;
    updateTrades(rawTrades: RawTrade[]): void;
    private enoughPosition;
    private enoughReserve;
    protected orderTakes(taker: LimitOrder): [
        LimitOrder,
        RawTrade[],
        Big,
        Big
    ];
    protected orderMakes(order: LimitOrder): OpenOrder;
    protected rawTradeTakesOpenOrder(rawTrade: RawTrade, maker: OpenOrder): void;
    private settle;
}
export { ManagingAssets as default, ManagingAssets, };

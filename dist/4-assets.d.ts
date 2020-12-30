import { Taken } from './3-taken';
import { Assets, LimitOrder, OrderId, UnidentifiedTrade, Config, OpenOrder } from './interfaces';
import Big from 'big.js';
declare class ManagingAssets extends Taken {
    private settlementPrice;
    private assets;
    constructor(config: Config, now: () => number);
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    getAssets(): Promise<Assets>;
    updateTrades(noidTrades: UnidentifiedTrade[]): void;
    private enoughPosition;
    private enoughReserve;
    protected orderTakes(taker: LimitOrder): [
        LimitOrder,
        UnidentifiedTrade[],
        Big,
        Big
    ];
    protected orderMakes(order: LimitOrder): OpenOrder;
    protected noidTradeTakesOpenOrder(noidTrade: UnidentifiedTrade, maker: OpenOrder): void;
    private settle;
}
export { ManagingAssets as default, ManagingAssets, };

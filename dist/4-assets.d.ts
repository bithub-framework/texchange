import { Taken } from './3-taken';
import { Assets, LimitOrder, OrderId, UnidentifiedTrade, Config, OpenOrder } from './interfaces';
import Big from 'big.js';
declare class ManagingAssets extends Taken {
    private assets;
    constructor(config: Config, now: () => number);
    makeLimitOrder(order: LimitOrder): Promise<OrderId>;
    cancelOrder(oid: OrderId): Promise<void>;
    getAssets(): Promise<Assets>;
    private enoughPosition;
    private enoughReserve;
    protected orderTakes(taker: LimitOrder): readonly [LimitOrder, Pick<import("interfaces/dist/data").Trade, "time" | "side" | "price" | "quantity">[], Big, Big];
    protected orderMakes(order: LimitOrder): OpenOrder;
    protected uTradeTakesOpenOrder(uTrade: UnidentifiedTrade, maker: OpenOrder): readonly [Big, Big, import("./manager-open-orders").Frozen];
    private settle;
}
export { ManagingAssets as default, ManagingAssets, };

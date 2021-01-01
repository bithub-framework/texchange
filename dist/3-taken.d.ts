import { Ordering } from './2-ordering';
import { UnidentifiedTrade, OpenOrder } from './interfaces';
declare class Taken extends Ordering {
    protected uTradeShouldTakeOpenOrder(trade: UnidentifiedTrade, maker: OpenOrder): boolean;
    protected uTradeTakesOpenOrder(uTrade: UnidentifiedTrade, maker: OpenOrder): readonly [import("big.js").Big, import("big.js").Big, import("./manager-open-orders").Frozen];
    protected uTradeTakesOpenOrders(_uTrade: UnidentifiedTrade): void;
    updateTrades(uTrades: UnidentifiedTrade[]): void;
}
export { Taken as default, Taken, };

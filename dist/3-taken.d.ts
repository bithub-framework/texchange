import { Ordering } from './2-ordering';
import { UnidentifiedTrade, OpenOrder } from './interfaces';
declare class Taken extends Ordering {
    protected uTradeShouldTakeOpenOrder(trade: UnidentifiedTrade, maker: OpenOrder): boolean;
    protected uTradeTakesOpenOrder(trade: UnidentifiedTrade, maker: OpenOrder): void;
    protected uTradeTakesOpenOrders(_uTrade: UnidentifiedTrade): void;
    updateTrades(uTrades: UnidentifiedTrade[]): void;
}
export { Taken as default, Taken, };

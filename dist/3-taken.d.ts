import { Ordering } from './2-ordering';
import { UnidentifiedTrade, OpenOrder } from './interfaces';
declare class Taken extends Ordering {
    protected noidTradeShouldTakeOpenOrder(trade: UnidentifiedTrade, maker: OpenOrder): boolean;
    protected noidTradeTakesOpenOrder(trade: UnidentifiedTrade, maker: OpenOrder): void;
    protected noidTradeTakesOpenOrders(_noidTrade: UnidentifiedTrade): void;
    updateTrades(noidTrades: UnidentifiedTrade[]): void;
}
export { Taken as default, Taken, };

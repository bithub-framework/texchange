import { Ordering } from './2-ordering';
import { RawTrade, OpenOrder } from './interfaces';
declare class Taken extends Ordering {
    protected rawTradeShouldTakeOpenOrder(trade: RawTrade, maker: OpenOrder): boolean;
    protected rawTradeTakesOpenOrder(trade: RawTrade, maker: OpenOrder): void;
    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade): void;
    updateTrades(rawTrades: RawTrade[]): void;
}
export { Taken as default, Taken, };

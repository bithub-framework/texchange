import { Ordering } from './2-ordering';
import { RawTrade, OpenOrder } from './interfaces';
declare class Taken extends Ordering {
    protected rawTradeShouldTakeOpenOrder(rawTrade: RawTrade, maker: OpenOrder): boolean;
    protected rawTradeTakesOpenOrder(rawTrade: RawTrade, maker: OpenOrder): void;
    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade): void;
    updateTrades(rawTrades: RawTrade[]): void;
}
export { Taken as default, Taken, };

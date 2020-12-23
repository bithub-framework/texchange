import { Ordering } from './2-ordering';
import { RawTrade, DetailedOpenOrder } from './interfaces';
import Big from 'big.js';
declare class Taken extends Ordering {
    protected rawTradeShouldTakeOpenOrder(rawTrade: RawTrade, maker: DetailedOpenOrder): boolean;
    protected rawTradeTakesOpenOrder(rawTrade: RawTrade, maker: DetailedOpenOrder): [Big, Big];
    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade): void;
    updateTrades(rawTrades: RawTrade[]): void;
}
export { Taken as default, Taken, };

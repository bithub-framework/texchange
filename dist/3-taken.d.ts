import { Ordering } from './2-ordering';
import { OpenOrder, RawTrade } from './interfaces';
import Big from 'big.js';
declare class Taken extends Ordering {
    protected rawTradeShouldTakeOpenOrder(rawTrade: RawTrade, maker: OpenOrder): boolean;
    protected rawTradeTakesOpenOrder(rawTrade: RawTrade, maker: OpenOrder): [Big, Big];
    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade): void;
    updateTrades(rawTrades: RawTrade[]): void;
}
export { Taken as default, Taken, };
import { Ordering } from './2-ordering';
import { UnidentifiedTrade, OpenOrder } from './interfaces';
import Big from 'big.js';
declare abstract class Taken extends Ordering {
    protected uTradeShouldTakeOpenOrder(trade: UnidentifiedTrade, maker: OpenOrder): boolean;
    protected uTradeTakesOpenOrder(uTrade: UnidentifiedTrade, maker: OpenOrder): readonly [Big, Big, import("./manager-open-orders").Frozen];
    protected uTradeTakesOpenOrders(uTrade: UnidentifiedTrade): Big;
    updateTrades(uTrades: UnidentifiedTrade[]): Big;
}
export { Taken as default, Taken, };

import { Ordering, OrderingEvents } from './2-ordering';
import { UnidentifiedTrade, OpenOrder, OpenMaker, Orderbook } from './interfaces';
import Big from 'big.js';
declare class Taken extends Ordering {
    protected uTradeShouldTakeOpenOrder(trade: UnidentifiedTrade, maker: OpenOrder): boolean;
    protected uTradeTakesOrderQueue(uTrade: UnidentifiedTrade, maker: OpenMaker): void;
    protected uTradeTakesOpenMaker(uTrade: UnidentifiedTrade, maker: OpenMaker): Big;
    protected uTradeTakesOpenMakers(uTrade: UnidentifiedTrade): Big;
    /** @override */
    updateTrades(uTrades: UnidentifiedTrade[]): void;
    /** @override */
    updateOrderbook(orderbook: Orderbook): void;
}
export { Taken as default, Taken, OrderingEvents as TakenEvents, };

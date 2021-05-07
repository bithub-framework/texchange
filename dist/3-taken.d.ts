import { Ordering, OrderingEvents } from './2-ordering';
import { UnidentifiedTrade, OpenOrder, OpenMaker, Orderbook } from './interfaces';
import { Frozen } from './manager-open-makers';
import Big from 'big.js';
declare class Taken extends Ordering {
    protected uTradeShouldTakeOpenOrder(trade: UnidentifiedTrade, maker: OpenOrder): boolean;
    protected uTradeTakesOrderQueue(uTrade: UnidentifiedTrade, maker: OpenMaker): void;
    protected uTradeTakesOpenMaker(uTrade: UnidentifiedTrade, maker: OpenMaker): {
        volume: Big;
        dollarVolume: Big;
        toThaw: Frozen;
    };
    protected uTradeTakesOpenMakers(uTrade: UnidentifiedTrade): Big;
    /** @override */
    updateTrades(uTrades: UnidentifiedTrade[]): void;
    /** @override */
    updateOrderbook(orderbook: Orderbook): void;
}
export { Taken as default, Taken, OrderingEvents as TakenEvents, };

import { Texchange as Parent, Events } from './4.1-making';
import { UnidentifiedTrade, OpenMaker, Orderbook } from './interfaces';
import Big from 'big.js';
declare abstract class Texchange extends Parent {
    protected uTradeTakesOpenMaker(uTrade: UnidentifiedTrade, maker: OpenMaker): Big;
    /** @override */
    updateTrades(uTrades: UnidentifiedTrade[]): void;
    /** @override */
    updateOrderbook(orderbook: Orderbook): void;
}
export { Texchange, Events, };

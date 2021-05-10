import { Texchange as Parent, Events } from './2-ordering';
import { UnidentifiedTrade, OpenOrder, OpenMaker } from './interfaces';
import Big from 'big.js';
declare class Texchange extends Parent {
    protected uTradeShouldTakeOpenOrder(trade: UnidentifiedTrade, maker: OpenOrder): boolean;
    protected uTradeTakesOrderQueue(uTrade: UnidentifiedTrade, maker: OpenMaker): void;
    protected uTradeTakesOpenMaker(uTrade: UnidentifiedTrade, maker: OpenMaker): Big;
    protected uTradeTakesOpenMakers(uTrade: UnidentifiedTrade): Big;
    /** @override */
    updateTrades(uTrades: UnidentifiedTrade[]): void;
}
export { Texchange, Events, };

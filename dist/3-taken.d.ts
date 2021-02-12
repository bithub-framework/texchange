import { Ordering } from './2-ordering';
import { UnidentifiedTrade, OpenOrder, OpenMaker } from './interfaces';
import { Frozen } from './manager-open-makers';
import Big from 'big.js';
declare abstract class Taken extends Ordering {
    protected uTradeShouldTakeOpenOrder(trade: UnidentifiedTrade, maker: OpenOrder): boolean;
    protected uTradeTakesOrderQueue(uTrade: UnidentifiedTrade, maker: OpenMaker): void;
    protected uTradeTakesOpenMaker(uTrade: UnidentifiedTrade, maker: OpenMaker): [Big, Big, Frozen];
    protected uTradeTakesOpenMakers(uTrade: UnidentifiedTrade): Big;
    updateTrades(uTrades: UnidentifiedTrade[]): Big;
}
export { Taken as default, Taken, };

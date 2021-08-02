import { Texchange as Parent, Events } from './4-equity.1-making';
import { UnidentifiedTrade, OpenMaker } from './interfaces';
import Big from 'big.js';
declare abstract class Texchange extends Parent {
    /** @override */
    protected uTradeTakesOpenMaker(uTrade: UnidentifiedTrade, maker: OpenMaker): Big;
    /** @override */
    updateTrades(uTrades: UnidentifiedTrade[]): void;
}
export { Texchange, Events, };

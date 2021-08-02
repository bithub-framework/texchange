import { Texchange as Parent, Events } from './5.1-making';
import { UnidentifiedTrade, OpenMaker } from './interfaces';
import Big from 'big.js';
declare abstract class Texchange extends Parent {
    /** @override */
    protected uTradeTakesOpenMaker(uTrade: UnidentifiedTrade, maker: OpenMaker): Big;
}
export { Texchange, Events, };

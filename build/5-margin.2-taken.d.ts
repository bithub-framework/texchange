import { Core as Parent, Events } from './5-margin.1-making';
import { UnidentifiedTrade, OpenMaker } from './interfaces';
import Big from 'big.js';
declare abstract class Core extends Parent {
    /** @override */
    protected uTradeTakesOpenMaker(uTrade: UnidentifiedTrade, maker: OpenMaker): Big;
}
export { Core, Events, };

import { HLike } from 'interfaces';
import { Trade } from '../../interfaces';
export interface TradeTakesOpenMakersLike<H extends HLike<H>> {
    tradeTakesOpenMakers(trade: Trade<H>): void;
}

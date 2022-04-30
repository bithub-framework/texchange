import {
	HLike,
	Trade,
} from 'interfaces';


export interface TradeTakesOpenMakersLike<H extends HLike<H>> {
	tradeTakesOpenMakers(trade: Trade<H>): void;
}

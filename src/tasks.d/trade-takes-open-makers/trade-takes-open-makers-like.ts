import {
	HLike,
	Trade,
} from 'secretary-like';


export interface TradeTakesOpenMakersLike<H extends HLike<H>> {
	tradeTakesOpenMakers(trade: Trade<H>): void;
}

import {
	HLike,
	TexchangeTrade,
} from 'interfaces';


export interface TradeTakesOpenMakersLike<H extends HLike<H>> {
	tradeTakesOpenMakers(trade: TexchangeTrade<H>): void;
}

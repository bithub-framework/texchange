import {
	HLike,
	TexchangeOpenOrder,
} from 'interfaces';

export interface CancelOpenOrderLike<H extends HLike<H>> {
	cancelOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}

import {
	HLike,
	TexchangeOpenOrder,
} from 'interfaces';

export interface OrderMakesLike<H extends HLike<H>> {
	orderMakes(
		order: TexchangeOpenOrder<H>,
	): void;
}

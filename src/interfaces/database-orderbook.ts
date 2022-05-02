import {
	HLike, HStatic,
	Orderbook,
	OrderbookStatic,
} from 'interfaces';


export type DatabaseOrderbookId = string;

export interface DatabaseOrderbook<H extends HLike<H>>
	extends Orderbook<H> {

	id: DatabaseOrderbookId;
}

export class DatabaseOrderbookStatic<H extends HLike<H>> {
	private Orderbook = new OrderbookStatic(this.H);

	public constructor(
		private H: HStatic<H>,
	) { }

	public copy(
		orderbook: DatabaseOrderbook<H>,
	): DatabaseOrderbook<H> {
		return {
			...this.Orderbook.copy(orderbook),
			id: orderbook.id,
		}
	}
}

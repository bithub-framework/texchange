import {
	HLike, HStatic,
	Orderbook, OrderbookStatic,
	BookOrder,
	Side,
} from 'secretary-like';


export type DatabaseOrderbookId = string;

export class DatabaseOrderbook<H extends HLike<H>> extends Orderbook<H> {
	public constructor(
		bids: BookOrder<H>[],
		asks: BookOrder<H>[],
		time: number,
		public id: DatabaseOrderbookId,
	) {
		super(
			bids,
			asks,
			time,
		);
	}
}

export class DatabaseOrderbookStatic<H extends HLike<H>> {
	private Orderbook = new OrderbookStatic(this.H);

	public constructor(
		private H: HStatic<H>,
	) { }

	public copy(
		databaseOrderbook: DatabaseOrderbook<H>,
	): DatabaseOrderbook<H> {
		const orderbook = this.Orderbook.copy(databaseOrderbook);
		return new DatabaseOrderbook<H>(
			orderbook.get(Side.BID),
			orderbook.get(Side.ASK),
			orderbook.time,
			databaseOrderbook.id,
		);
	}
}

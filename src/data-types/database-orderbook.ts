import {
	HLike,
	Orderbook, OrderbookFactory,
	Side,
} from 'secretary-like';


export type DatabaseOrderbookId = string;

export interface DatabaseOrderbook<H extends HLike<H>> extends Orderbook<H> {
	id: DatabaseOrderbookId,
}

export class DatabaseOrderbookFactory<H extends HLike<H>>   {
	public constructor(
		private orderbookFactory: OrderbookFactory<H>,
	) { }

	public copy(
		databaseOrderbook: DatabaseOrderbook<H>,
	): DatabaseOrderbook<H> {
		const orderbook = this.orderbookFactory.copy(databaseOrderbook);
		return {
			[Side.BID]: orderbook[Side.BID],
			[Side.ASK]: orderbook[Side.ASK],
			time: orderbook.time,
			id: databaseOrderbook.id,
		};
	}
}

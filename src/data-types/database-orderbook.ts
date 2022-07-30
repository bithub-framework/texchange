import {
	HLike,
	OrderbookLike,
	Orderbook,
	OrderbookFactory,
	Side,
	BookOrderLike,
	BookOrderFactory,
	CompositeDataFactoryLike,
	CompositeDataLike,
} from 'secretary-like';


export type DatabaseOrderbookId = string;

export interface DatabaseOrderbookLike<H extends HLike<H>> extends
	OrderbookLike<H>,
	DatabaseOrderbook.Source<H>,
	CompositeDataLike {
	id: DatabaseOrderbookId;
}

class DatabaseOrderbook<H extends HLike<H>> implements DatabaseOrderbookLike<H> {
	[side: Side]: BookOrderLike<H>[];
	public time: number;
	public id: DatabaseOrderbookId;

	public constructor(
		source: DatabaseOrderbook.Source<H>,
		private factory: DatabaseOrderbookFactory<H>,
		bookOrderFactory: BookOrderFactory<H>,
	) {
		for (const side of [Side.BID, Side.ASK])
			this[side] = source[side].map(
				order => bookOrderFactory.new(order),
			);
		this.time = source.time;
		this.id = source.id;
	}

	public toJSON(): unknown {
		return this.factory.capture(this);
	}

	public toString(): string {
		return JSON.stringify(this.toJSON());
	}
}

export namespace DatabaseOrderbook {
	export interface Source<H extends HLike<H>> extends Orderbook.Source<H> {
		id: DatabaseOrderbookId;
	}

	export interface Snapshot extends Orderbook.Snapshot {
		id: DatabaseOrderbookId;
	}
}

export class DatabaseOrderbookFactory<H extends HLike<H>> implements
	CompositeDataFactoryLike<
	DatabaseOrderbook.Source<H>,
	DatabaseOrderbookLike<H>,
	DatabaseOrderbook.Snapshot>
{
	public constructor(
		private bookOrderFactory: BookOrderFactory<H>,
		private orderbookFactory: OrderbookFactory<H>,
	) { }

	public new(source: DatabaseOrderbook.Source<H>): DatabaseOrderbookLike<H> {
		return new DatabaseOrderbook(
			source,
			this,
			this.bookOrderFactory,
		);
	}

	public capture(databaseOrderbook: DatabaseOrderbookLike<H>): DatabaseOrderbook.Snapshot {
		return {
			...this.orderbookFactory.capture(databaseOrderbook),
			id: databaseOrderbook.id,
		};
	}

	public restore(snapshot: DatabaseOrderbook.Snapshot): DatabaseOrderbookLike<H> {
		return this.new({
			...this.orderbookFactory.restore(snapshot),
			id: snapshot.id,
		});
	}
}

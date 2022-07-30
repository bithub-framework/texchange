import {
	HLike,
	Orderbook,
	OrderbookFactory,
	Side,
	BookOrder,
	BookOrderFactory,
	CompositeDataFactoryLike,
	CompositeDataLike,
} from 'secretary-like';


export type DatabaseOrderbookId = string;

export interface DatabaseOrderbook<H extends HLike<H>> extends
	Orderbook<H>,
	DatabaseOrderbook.Source<H>,
	CompositeDataLike {
	id: DatabaseOrderbookId;
}

class ConcreteDatabaseOrderbook<H extends HLike<H>> implements DatabaseOrderbook<H> {
	[side: Side]: BookOrder<H>[];
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
	DatabaseOrderbook<H>,
	DatabaseOrderbook.Snapshot>
{
	public constructor(
		private bookOrderFactory: BookOrderFactory<H>,
		private orderbookFactory: OrderbookFactory<H>,
	) { }

	public new(source: DatabaseOrderbook.Source<H>): DatabaseOrderbook<H> {
		return new ConcreteDatabaseOrderbook(
			source,
			this,
			this.bookOrderFactory,
		);
	}

	public capture(databaseOrderbook: DatabaseOrderbook<H>): DatabaseOrderbook.Snapshot {
		return {
			...this.orderbookFactory.capture(databaseOrderbook),
			id: databaseOrderbook.id,
		};
	}

	public restore(snapshot: DatabaseOrderbook.Snapshot): DatabaseOrderbook<H> {
		return this.new({
			...this.orderbookFactory.restore(snapshot),
			id: snapshot.id,
		});
	}
}

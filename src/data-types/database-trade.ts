import {
	HLike, HFactory,
	Trade,
	TradeFactory,
	Side,
	CompositeDataFactoryLike,
	CompositeDataLike,
} from 'secretary-like';

export type DatabaseTradeId = string;


export interface DatabaseTrade<H extends HLike<H>> extends
	Trade<H>,
	DatabaseTrade.Source<H>,
	CompositeDataLike {
	id: DatabaseTradeId;
}

class ConcreteDatabaseTrade<H extends HLike<H>> implements DatabaseTrade<H> {
	public side: Side;
	public price: H;
	public quantity: H;
	public time: number;
	public id: DatabaseTradeId;

	public constructor(
		source: DatabaseTrade.Source<H>,
		private factory: DatabaseTradeFactory<H>,
	) {
		({
			side: this.side,
			price: this.price,
			quantity: this.quantity,
			time: this.time,
			id: this.id,
		} = source);
	}

	public toJSON(): unknown {
		return this.factory.capture(this);
	}

	public toString(): string {
		return JSON.stringify(this.toJSON());
	}
}

export namespace DatabaseTrade {
	export interface Source<H extends HLike<H>> extends Trade.Source<H> {
		id: DatabaseTradeId;
	}

	export interface Snapshot extends Trade.Snapshot {
		id: DatabaseTradeId;
	}
}

export class DatabaseTradeFactory<H extends HLike<H>> implements
	CompositeDataFactoryLike<
	DatabaseTrade.Source<H>,
	DatabaseTrade<H>,
	DatabaseTrade.Snapshot>
{
	public constructor(
		private hFactory: HFactory<H>,
		private tradeFactory: TradeFactory<H>,
	) { }

	public create(source: DatabaseTrade.Source<H>): DatabaseTrade<H> {
		return new ConcreteDatabaseTrade(source, this);
	}

	public capture(trade: DatabaseTrade<H>): DatabaseTrade.Snapshot {
		return {
			...this.tradeFactory.capture(trade),
			id: trade.id,
		}
	}

	public restore(snapshot: DatabaseTrade.Snapshot): DatabaseTrade<H> {
		return this.create({
			...this.tradeFactory.restore(snapshot),
			id: snapshot.id,
		});
	}
}

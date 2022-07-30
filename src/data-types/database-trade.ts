import {
	HLike, HFactory,
	Trade,
	TradeFactory,
	TradeLike,
	Side,
	CompositeDataFactoryLike,
	CompositeDataLike,
} from 'secretary-like';

export type DatabaseTradeId = string;


export interface DatabaseTradeLike<H extends HLike<H>> extends
	TradeLike<H>,
	DatabaseTrade.Source<H>,
	CompositeDataLike {
	id: DatabaseTradeId;
}

class DatabaseTrade<H extends HLike<H>> implements DatabaseTradeLike<H> {
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
	DatabaseTradeLike<H>,
	DatabaseTrade.Snapshot>
{
	public constructor(
		private hFactory: HFactory<H>,
		private tradeFactory: TradeFactory<H>,
	) { }

	public new(source: DatabaseTrade.Source<H>): DatabaseTrade<H> {
		return new DatabaseTrade(source, this);
	}

	public capture(trade: DatabaseTradeLike<H>): DatabaseTrade.Snapshot {
		return {
			...this.tradeFactory.capture(trade),
			id: trade.id,
		}
	}

	public restore(snapshot: DatabaseTrade.Snapshot): DatabaseTradeLike<H> {
		return this.new({
			...this.tradeFactory.restore(snapshot),
			id: snapshot.id,
		});
	}
}

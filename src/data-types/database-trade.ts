import {
	HLike,
	Trade, TradeFactory,
} from 'secretary-like';

export type DatabaseTradeId = string;


export interface DatabaseTrade<H extends HLike<H>> extends Trade<H> {
	id: DatabaseTradeId;
}

export class DatabaseTradeFactory<H extends HLike<H>> {
	public constructor(
		private tradeFactory: TradeFactory<H>,
	) { }

	public copy(
		trade: DatabaseTrade<H>,
	): DatabaseTrade<H> {
		return {
			...this.tradeFactory.copy(trade),
			id: trade.id,
		}
	}
}

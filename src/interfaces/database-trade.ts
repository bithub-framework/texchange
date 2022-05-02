import {
	HLike, HStatic,
	Trade, TradeStatic,
} from 'interfaces';

export type DatabaseTradeId = string;


export interface DatabaseTrade<H extends HLike<H>>
	extends Trade<H> {

	id: DatabaseTradeId;
}

export class DatabaseTradeStatic<H extends HLike<H>> {
	private Trade = new TradeStatic(this.H);

	public constructor(
		private H: HStatic<H>,
	) { }

	public copy(
		trade: DatabaseTrade<H>,
	): DatabaseTrade<H> {
		return {
			...this.Trade.copy(trade),
			id: trade.id,
		}
	}
}

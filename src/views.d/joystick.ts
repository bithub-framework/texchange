import { Context } from '../context/context';
import {
	Orderbook,
	HLike,
	TexchangeTradesStatic,
	TexchangeTradeIdStatic,
	OrderbookStatic,
} from 'interfaces';

import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UpdateTrades, DatabaseTrades } from '../use-cases.d/update-trades';


export class Joystick<H extends HLike<H>> {
	private TradeId = new TexchangeTradeIdStatic();
	private Trades = new TexchangeTradesStatic(this.context.H, this.TradeId);
	private Orderbook = new OrderbookStatic(this.context.H);

	public constructor(
		private context: Context<H>,
		private useCases: Joystick.UseCaseDeps<H>,
	) { }

	public updateTrades($trades: DatabaseTrades<H>): void {
		this.useCases.updateTrades.updateTrades(
			<DatabaseTrades<H>>this.Trades.copy($trades),
		);
	}

	public updateOrderbook($orderbook: Orderbook<H>): void {
		this.useCases.updateOrderbook.updateOrderbook(
			this.Orderbook.copy($orderbook),
		);
	}
}

export namespace Joystick {
	export interface UseCaseDeps<H extends HLike<H>> {
		updateTrades: UpdateTrades<H>;
		updateOrderbook: UpdateOrderbook<H>;
	}
}

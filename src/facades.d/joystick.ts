import { Context } from '../context';
import { Config } from '../context.d/config';
import {
	HLike,
} from 'interfaces';
import {
	TradeIdStatic,
} from '../interfaces';

import {
	UpdateOrderbook,
	DatabaseOrderbook,
	DatabaseOrderbookStatic,
} from '../use-cases.d/update-orderbook';
import {
	UpdateTrades,
	DatabaseTrades,
	DatabaseTradesStatic,
} from '../use-cases.d/update-trades';


export class Joystick<H extends HLike<H>> {
	public config: Config<H>;

	private TradeId = new TradeIdStatic();
	private DatabaseOrderbook = new DatabaseOrderbookStatic(this.context.H);
	private DatabaseTrades = new DatabaseTradesStatic(this.context.H, this.TradeId);

	public constructor(
		private context: Context<H>,
		private useCases: Joystick.UseCaseDeps<H>,
	) {
		this.config = this.context.config;
	}

	public updateTrades($trades: DatabaseTrades<H>): void {
		this.useCases.updateTrades.updateTrades(
			this.DatabaseTrades.copy($trades),
		);
	}

	public updateOrderbook($orderbook: DatabaseOrderbook<H>): void {
		this.useCases.updateOrderbook.updateOrderbook(
			this.DatabaseOrderbook.copy($orderbook),
		);
	}

	public quantity(price: H, dollarVolume: H): H {
		return this.context.calc.quantity(price, dollarVolume);
	};

	public dollarVolume(price: H, quantity: H): H {
		return this.context.calc.dollarVolume(price, quantity);
	}
}

export namespace Joystick {
	export interface UseCaseDeps<H extends HLike<H>> {
		updateTrades: UpdateTrades<H>;
		updateOrderbook: UpdateOrderbook<H>;
	}
}

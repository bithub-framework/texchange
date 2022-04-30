import { Context } from '../context';
import { Config } from '../context.d/config';
import {
	HLike,
} from 'interfaces';

import { DatabaseOrderbook } from '../interfaces/database-orderbook';
import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { DatabaseTrade } from '../interfaces/database-trade';
import { UpdateTrades } from '../use-cases.d/update-trades';


export class Joystick<H extends HLike<H>> {
	public config: Config<H>;

	public constructor(
		private context: Context<H>,
		private useCases: Joystick.UseCaseDeps<H>,
	) {
		this.config = this.context.config;
	}

	public Data = this.context.Data;

	public updateTrades($trades: DatabaseTrade<H>[]): void {
		this.useCases.updateTrades.updateTrades(
			$trades.map(
				trade => this.context.Data.DatabaseTrade.copy(trade),
			),
		);
	}

	public updateOrderbook($orderbook: DatabaseOrderbook<H>): void {
		this.useCases.updateOrderbook.updateOrderbook(
			this.context.Data.DatabaseOrderbook.copy($orderbook),
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

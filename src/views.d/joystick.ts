import { Context } from '../context/context';
import { DatabaseTrade } from '../models.d/progress';
import {
	Orderbook,
	HLike,
} from 'interfaces';

import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UpdateTrades } from '../use-cases.d/update-trades';


export class Joystick<H extends HLike<H>> {
	constructor(
		private context: Context<H>,
		private useCases: Joystick.UseCaseDeps<H>,
	) { }

	public updateTrades(trades: readonly DatabaseTrade<H>[]): void {
		this.useCases.updateTrades.updateTrades(trades);
	}

	public updateOrderbook(orderbook: Orderbook<H>): void {
		this.useCases.updateOrderbook.updateOrderbook(orderbook);
	}
}

export namespace Joystick {
	export interface UseCaseDeps<H extends HLike<H>> {
		updateTrades: UpdateTrades<H>;
		updateOrderbook: UpdateOrderbook<H>;
	}
}

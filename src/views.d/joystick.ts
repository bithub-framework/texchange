import { Context } from '../context';
import { UseCasesLike } from '../use-cases';
import { DatabaseTrade } from '../models.d/progress';
import {
	Orderbook,
	HLike,
} from 'interfaces';


export class Joystick<H extends HLike<H>> {
	constructor(
		private context: Context<H>,
		private useCases: UseCasesLike<H>,
	) { }

	public updateTrades(trades: readonly DatabaseTrade<H>[]): void {
		this.useCases.updateTrades.updateTrades(trades);
	}

	public updateOrderbook(orderbook: Orderbook<H>): void {
		this.useCases.updateOrderbook.updateOrderbook(orderbook);
	}
}

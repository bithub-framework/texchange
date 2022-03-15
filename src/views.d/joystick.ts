import { Context } from '../context';
import { UseCasesLike } from '../use-cases';
import { DatabaseTrade } from '../models.d/progress';
import {
	ConcreteOrderbook,
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

	public updateOrderbook(orderbook: ConcreteOrderbook<H>): void {
		this.useCases.updateOrderbook.updateOrderbook(orderbook);
	}
}

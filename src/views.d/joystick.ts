import { Context } from '../context';
import { UseCases } from '../use-cases';
import { DatabaseTrade } from '../models.d/progress';
import { Orderbook } from 'interfaces';


export class Joystick {
	constructor(
		private context: Context,
		private useCases: UseCases,
	) { }

	public updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void {
		this.useCases.updateTrades.updateTrades(trades);
	}

	public updateOrderbook(orderbook: Readonly<Orderbook>): void {
		this.useCases.updateOrderbook.updateOrderbook(orderbook);
	}
}

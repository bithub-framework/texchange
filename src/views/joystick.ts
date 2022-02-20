import { Context } from '../context';
import { Tasks } from '../tasks';
import {
	Orderbook,
	DatabaseTrade,
} from '../interfaces';



export class Joystick {
	constructor(
		private context: Context,
		private tasks: Tasks,
	) { }

	public updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void {
		this.tasks.updateTrades.updateTrades(trades);
	}

	public updateOrderbook(orderbook: Readonly<Orderbook>): void {
		this.tasks.updateOrderbook.updateOrderbook(orderbook);
	}
}

import { Context } from '../context/context';
import { Tasks } from '../tasks/tasks';
import {
	Orderbook,
	DatabaseTrade,
} from '../interfaces';
import assert = require('assert');



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

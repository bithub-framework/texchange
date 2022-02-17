import { Context } from '../context/context';
import { Scheduler } from '../scheduler';
import {
	Orderbook,
	DatabaseTrade,
} from '../interfaces';
import assert = require('assert');



export class Joystick {
	constructor(
		private context: Context,
		private scheduler: Scheduler,
	) { }

	public updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void {
		this.scheduler.updateTrades(trades);
	}

	public updateOrderbook(orderbook: Readonly<Orderbook>): void {
		this.scheduler.updateOrderbook(orderbook);
	}
}

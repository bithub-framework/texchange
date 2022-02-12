import {
	Orderbook,
	DatabaseTrade,
} from '../interfaces';
import { type Hub } from '../hub';
import assert = require('assert');

export class Joystick {
	constructor(private hub: Hub) { }

	/**
	 * Make sure update all trades which have same timestamp at a time.
	 * @param trades
	 */
	public updateTrades(trades: DatabaseTrade[]): void {
		assert(trades.length);
		const now = this.hub.context.timeline.now();
		assert(now !== this.hub.models.progress.latestDatabaseTradeTime);
		for (const trade of trades) assert(trade.time === now);
		this.hub.models.progress.updateDatabaseTrades(trades);
		for (const trade of trades)
			this.hub.presenters.taken.tradeTakesOpenMakers(trade);
		this.hub.views.instant.pushTrades(trades);
		this.hub.models.mtm.updateTrades(trades);
	}

	public updateOrderbook(orderbook: Orderbook): void {
		assert(orderbook.time === this.hub.context.timeline.now());
		this.hub.models.orderbooks.setBasebook(orderbook);
		this.hub.views.instant.pushOrderbook();
	}
}

import {
	Orderbook,
	DatabaseTrade,
} from '../interfaces';
import { type Hub } from '../hub';
import assert = require('assert');
import { EventEmitter } from 'events';


interface Deps extends Pick<Hub, 'context' | 'models' | 'presenters'> {
	views: Pick<Hub['views'], 'instant'>;
}

export class Joystick extends EventEmitter {
	constructor(private hub: Deps) { super(); }

	public updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void {
		assert(trades.length);
		const now = this.hub.context.timeline.now();
		assert(now !== this.hub.models.progress.latestDatabaseTradeTime);
		for (const trade of trades) assert(trade.time === now);
		for (const trade of trades) this.emit('trades', trades);
		// this.hub.models.progress.updateDatabaseTrades(trades);
		// for (const trade of trades)
		// this.hub.presenters.taken.tradeTakesOpenMakers(trade);
		// this.hub.views.instant.pushTrades(trades);
		// this.hub.models.mtm.updateTrades(trades);
	}

	public updateOrderbook(orderbook: Readonly<Orderbook>): void {
		assert(orderbook.time === this.hub.context.timeline.now());
		this.emit('orderbook', orderbook);
		// this.hub.models.book.setBasebook(orderbook);
		// this.hub.views.instant.pushOrderbook();
	}
}

export type Events = {
	trades: [readonly Readonly<DatabaseTrade>[]];
	orderbook: [Readonly<Orderbook>];
}

export interface Joystick {
	on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}

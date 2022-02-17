import { EventEmitter } from 'events';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { Taken } from './taken';
import {
	Orderbook,
	DatabaseTrade,
} from '../interfaces';
import { type Stages } from '../scheduler';
import assert = require('assert');



export type Involved = keyof Pick<Models,
	'book' | 'progress' | 'pricing'
> | Taken.Involved;

export class Updating extends EventEmitter {
	public static involved: Involved[] = ['book', 'progress', 'pricing'];

	constructor(
		private context: Context,
		private models: Pick<Models, Involved>,
		private stages: Pick<Stages, Involved>,
		private taken: Taken,
	) { super(); }


	public updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void {
		assert(trades.length);
		const now = this.context.timeline.now();
		assert(now !== this.models.progress.latestDatabaseTradeTime);
		for (const trade of trades) assert(trade.time === now);
		this.models.progress.updateDatabaseTrades(trades);
		for (const trade of trades)
			this.taken.tradeTakesOpenMakers(trade);
		this.emit('pushTrades', trades);
		this.models.pricing.updateTrades(trades);

		this.stages.progress = true;
		this.stages.pricing = true;
	}

	public updateOrderbook(orderbook: Readonly<Orderbook>): void {
		assert(orderbook.time === this.context.timeline.now());
		this.models.book.setBasebook(orderbook);
		this.emit('pushOrderbook');

		this.stages.book = true;
	}
}

type Events = {
	pushTrades: [readonly Readonly<DatabaseTrade>[]];
	pushOrderbook: [];
}

export interface Updating extends EventEmitter {
	on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
	emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}

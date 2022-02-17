import { Models } from '../models/models';
import { Context } from '../context/context';
import { Controllers } from '../controllers/controllers';
import {
	LimitOrder,
	OpenOrder,
	DatabaseTrade,
} from '../interfaces';
import assert = require('assert');
import { ModelLike } from '../models/model';
import { initializeStages } from './initialize-stages';
import { EventEmitter } from 'events';
import Big from 'big.js';



export class UpdateTrades extends EventEmitter {
	private involved: ModelLike[] = [
		this.models.progress,
		this.models.pricing,
		...this.controllers.taken.involved,
	];

	constructor(
		private context: Context,
		private models: Models,
		private controllers: Controllers,
	) { super(); }

	public updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void {
		initializeStages(this.involved);

		const { taken } = this.controllers;
		assert(trades.length);
		const now = this.context.timeline.now();
		assert(now !== this.models.progress.latestDatabaseTradeTime);
		for (const trade of trades) assert(trade.time === now);
		this.models.progress.updateDatabaseTrades(trades);
		for (const trade of trades)
			taken.tradeTakesOpenMakers(trade);
		this.emit('pushTrades', trades);
		this.models.pricing.updateTrades(trades);

		this.models.progress.stage = true;
		this.models.pricing.stage = true;
	}
}

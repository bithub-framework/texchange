import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import { UseCase } from './use-case';
import {
	DatabaseTrade,
} from '../interfaces';
import assert = require('assert');


export class UpdateTrades extends UseCase {
	constructor(
		protected context: Context,
		protected models: Models,
		protected tasks: Tasks,
		private realTimeSettlement: boolean,
	) {
		super(context, models, tasks);
	}

	public updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void {
		const { tradeTakesOpenMakers, settle } = this.tasks;
		assert(trades.length);
		const now = this.context.timeline.now();
		assert(now !== this.models.progress.latestDatabaseTradeTime);
		for (const trade of trades) assert(trade.time === now);
		this.models.progress.updateDatabaseTrades(trades);

		this.context.broadcast.emit('trades', trades);

		for (const trade of trades)
			tradeTakesOpenMakers.tradeTakesOpenMakers(trade);
		this.models.pricing.updateTrades(trades);
		if (this.realTimeSettlement) settle.settle();
	}
}

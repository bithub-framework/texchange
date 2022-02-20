import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import {
	DatabaseTrade,
} from '../interfaces';
import assert = require('assert');
import { ModelLike } from '../models.d/model';
import { initializeStages } from '../initialize-stages';
import { Broadcast } from '../context.d/broadcast';


type OwnInvolved = Pick<Models, 'progress' | 'pricing'>;

export class UpdateTrades {
	private involved: ModelLike[] = [
		this.models.progress,
		this.models.pricing,
		...this.controllers.tradeTakesOpenMakers.involved,
	];

	constructor(
		private context: Context,
		private models: OwnInvolved,
		private controllers: Controllers,
	) { }

	public updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void {
		initializeStages(this.involved);

		const { tradeTakesOpenMakers: taken } = this.controllers;
		assert(trades.length);
		const now = this.context.timeline.now();
		assert(now !== this.models.progress.latestDatabaseTradeTime);
		for (const trade of trades) assert(trade.time === now);
		this.models.progress.updateDatabaseTrades(trades);

		this.context.broadcast.emit('trades', trades);

		for (const trade of trades)
			taken.tradeTakesOpenMakers(trade);
		this.models.pricing.updateTrades(trades);

		this.models.progress.stage = true;
		this.models.pricing.stage = true;
	}
}

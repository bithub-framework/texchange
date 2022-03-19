import { Models } from '../models/models';
import { Context } from '../context';
import { Tasks } from '../tasks/tasks';
import { UseCase } from '../use-case';
import { DatabaseTrade } from '../models.d/progress';
import assert = require('assert');
import { Broadcast } from '../broadcast';
import { HLike } from 'interfaces';


export class UpdateTrades<H extends HLike<H>> extends UseCase<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: Models<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: Tasks<H>,
		private readonly realTimeSettlement: boolean,
	) { super(); }

	public updateTrades(trades: readonly DatabaseTrade<H>[]): void {
		const { tradeTakesOpenMakers, settle } = this.tasks;
		assert(trades.length);
		const now = this.context.timeline.now();
		assert(now !== this.models.progress.latestDatabaseTradeTime);
		for (const trade of trades) assert(trade.time === now);
		this.models.progress.updateDatabaseTrades(trades);

		this.broadcast.emit('trades', trades);

		for (const trade of trades)
			tradeTakesOpenMakers.tradeTakesOpenMakers(trade);
		this.models.pricing.updateTrades(trades);
		if (this.realTimeSettlement) settle.settle();
	}
}

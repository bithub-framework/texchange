import { ModelsStatic } from '../models/models-static';
import { Context } from '../context';
import { TasksLike } from '../tasks/tasks-like';
import { UseCase } from '../use-case';
import { DatabaseTrade } from '../models.d/progress';
import assert = require('assert');
import { Broadcast } from '../broadcast';


export class UpdateTrades extends UseCase {
	constructor(
		protected readonly context: Context,
		protected readonly models: ModelsStatic,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
		private readonly realTimeSettlement: boolean,
	) { super(); }

	public updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void {
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

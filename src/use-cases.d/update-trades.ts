import { Context } from '../context';
import assert = require('assert');
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';
import { DatabaseTrade } from '../interfaces/database-trade';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { TaskTradeTakesOpenMakers } from '../tasks.d/trade-takes-open-makers';
import { Clearinghouse } from '../tasks.d/settle/settle';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing/pricing';


export class UseCaseUpdateTrades<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.models)
		private models: UseCaseUpdateTrades.ModelDeps<H>,
		@inject(TYPES.broadcast)
		private broadcast: Broadcast<H>,
		@inject(TYPES.tasks)
		private tasks: UseCaseUpdateTrades.TaskDeps<H>,
		@inject(TYPES.USE_CASES.realTimeSettlement)
		private realTimeSettlement: boolean,
	) { }

	public updateTrades(trades: DatabaseTrade<H>[]): void {
		const { tradeTakesOpenMakers, settle } = this.tasks;
		assert(trades.length);
		const now = this.context.timeline.now();
		for (const trade of trades) assert(trade.time === now);
		this.models.progress.updateDatabaseTrades(trades);

		this.broadcast.emit('trades', trades);

		for (const trade of trades)
			tradeTakesOpenMakers.tradeTakesOpenMakers(trade);
		this.models.pricing.updateTrades(trades);
		if (this.realTimeSettlement) settle.settle();
	}
}

export namespace UseCaseUpdateTrades {
	export interface ModelDeps<H extends HLike<H>> {
		progress: Progress<H>;
		pricing: Pricing<H, unknown>;
	}

	export interface TaskDeps<H extends HLike<H>> {
		tradeTakesOpenMakers: TaskTradeTakesOpenMakers<H>;
		settle: Clearinghouse<H>;
	}
}

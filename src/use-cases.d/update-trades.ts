import { Context } from '../context/context';
import { DatabaseTrade } from '../models.d/progress';
import assert = require('assert');
import { Broadcast } from '../broadcast';
import { HLike } from 'interfaces';

import { TradeTakesOpenMakersLike } from '../tasks.d/trade-takes-open-makers/trade-takes-open-makers-like';
import { SettleLike } from '../tasks.d/settle/settle-like';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing/pricing';


export class UpdateTrades<H extends HLike<H>> {
	public constructor(
		protected readonly context: Context<H>,
		protected readonly models: UpdateTrades.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: UpdateTrades.TaskDeps<H>,
		private readonly realTimeSettlement: boolean,
	) { }

	public updateTrades(trades: readonly DatabaseTrade<H>[]): void {
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

export namespace UpdateTrades {
	export interface ModelDeps<H extends HLike<H>> {
		progress: Progress<H>;
		pricing: Pricing<H, unknown>;
	}

	export interface TaskDeps<H extends HLike<H>> {
		tradeTakesOpenMakers: TradeTakesOpenMakersLike<H>;
		settle: SettleLike;
	}
}

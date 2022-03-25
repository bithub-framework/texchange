import { Context } from '../context/context';
import assert = require('assert');
import { Broadcast } from '../broadcast';
import {
	HLike,
	TexchangeTrade,
} from 'interfaces';

import { TradeTakesOpenMakersLike } from '../tasks.d/trade-takes-open-makers/trade-takes-open-makers-like';
import { SettleLike } from '../tasks.d/settle/settle-like';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing/pricing';


export class UpdateTrades<H extends HLike<H>> {
	public constructor(
		protected context: Context<H>,
		protected models: UpdateTrades.ModelDeps<H>,
		protected broadcast: Broadcast<H>,
		protected tasks: UpdateTrades.TaskDeps<H>,
		private realTimeSettlement: boolean,
	) { }

	public updateTrades(trades: DatabaseTrades<H>): void {
		const { tradeTakesOpenMakers, settle } = this.tasks;
		assert(trades.length);
		const now = this.context.timeline.now();
		for (const trade of trades) assert(trade.time === now);

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


export interface DatabaseTrade<H extends HLike<H>>
	extends TexchangeTrade<H> {

	id: string;
}

export type DatabaseTrades<H extends HLike<H>>
	= DatabaseTrade<H>[];

import { Context } from '../context';
import assert = require('assert');
import { Broadcast } from '../middlewares/broadcast';
import {
	HLike,
	Length,
} from 'secretary-like';
import { DatabaseTrade } from '../interfaces/database-trade';
import { MarginAssets } from '../models.d/margin-assets';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing/pricing';
import { DatabaseTradeHandler } from '../middlewares/database-trade-handler';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


export class UseCaseUpdateTrades<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.MODELS.marginAssets)
		private marginAssets: MarginAssets<H>,
		@inject(TYPES.MODELS.progress)
		private progress: Progress<H>,
		@inject(TYPES.MODELS.pricing)
		private pricing: Pricing<H, unknown>,
		@inject(TYPES.MIDDLEWARES.broadcast)
		private broadcast: Broadcast<H>,
		@inject(TYPES.MIDDLEWARES.availableAssetsCalculator)
		private databaseTradeHandler: DatabaseTradeHandler<H>,
		@inject(TYPES.USE_CASES.realTimeSettlement)
		private realTimeSettlement: boolean,
	) { }

	public updateTrades(trades: DatabaseTrade<H>[]): void {
		assert(trades.length);
		const now = this.context.timeline.now();
		for (const trade of trades) assert(trade.time === now);
		this.progress.updateDatabaseTrades(trades);

		this.broadcast.emit('trades', trades);

		for (const trade of trades)
			this.databaseTradeHandler.tradeTakesOpenMakers(trade);
		this.pricing.updateTrades(trades);
		if (this.realTimeSettlement) {
			this.marginAssets.settle(
				Length.LONG,
				this.pricing.getSettlementPrice(),
			);
			this.marginAssets.settle(Length.SHORT,
				this.pricing.getSettlementPrice(),
			);
		}
	}
}

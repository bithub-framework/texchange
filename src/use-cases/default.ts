import { Context } from '../context';
import { Models } from '../models/models';
import { Broadcast } from '../broadcast';
import { Tasks } from '../tasks/tasks';

import { UpdateTrades } from '../use-cases.d/update-trades';
import { MarketCalc } from '../use-cases.d/market-calc';
import { UseCases } from './use-cases';
import { HLike } from 'interfaces';

import { DefaultMarketCalc } from '../use-cases.d/market-calc/default';

/**
 * 默认实时结算
 */
export class DefaultUseCases<H extends HLike<H>>
	extends UseCases<H> {

	public readonly updateTrades: UpdateTrades<H>;
	public readonly marketCalc: MarketCalc<H>;

	constructor(
		context: Context<H>,
		models: Models<H>,
		broadcast: Broadcast<H>,
		tasks: Tasks<H>,
	) {
		super(
			context,
			models,
			broadcast,
			tasks,
		);
		this.updateTrades = new UpdateTrades(context, models, broadcast, tasks, true);
		this.marketCalc = new DefaultMarketCalc(context, models, broadcast, tasks);
	}
}

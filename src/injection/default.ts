import { createBaseContainer } from './base-container';
import { HLike, HStatic } from 'interfaces';
import { Container } from 'injektor';
import { TYPES } from '../types';

// Context
import { Context } from '../context';
import { Config } from '../context.d/config';
import { Timeline } from 'interfaces';
import { MarketCalc } from 'interfaces';
import { DefaultMarketCalc } from '../context.d/market-calc/default';

// Models
import { Makers } from '../models.d/makers/makers';
import { DefaultMakers } from '../models.d/makers/default';
import { Pricing } from '../models.d/pricing/pricing';
import { DefaultPricing } from '../models.d/pricing/default';

import { Models } from '../models';

//Broadcast
import { Broadcast } from '../broadcast';

// Tasks
import { GetAvailableLike } from '../tasks.d/get-available/get-available-like';
import { SettleLike } from '../tasks.d/settle/settle-like';
import { MarginAccumulationLike } from '../tasks.d/margin-accumulation/margin-accumulation-like';

import { DefaultGetAvailable } from '../tasks.d/get-available/default';
import { DefaultSettle } from '../tasks.d/settle/default';
import { DefaultMarginAccumulation } from '../tasks.d/margin-accumulation/default';

import { Tasks } from '../tasks/tasks';
import { DefaultTasks } from '../tasks/default';

// Mark to market
import { Mtm } from '../mark-to-market/mtm';
import { DefaultMtm } from '../mark-to-market/default';

// Use cases
import { UpdateTrades } from '../use-cases.d/update-trades';


export function createDefaultContainer<H extends HLike<H>>(
	config: Config<H>,
	timeline: Timeline,
	H: HStatic<H>,
): Container {
	const c = createBaseContainer(
		config,
		timeline,
		H,
	);

	c.rcs<MarketCalc<H>>(
		TYPES.MarketCalc,
		DefaultMarketCalc,
	);

	c.rcs<Makers<H>>(
		Makers,
		DefaultMakers,
	);
	c.rcs<Pricing<H, DefaultPricing.Snapshot>>(
		Pricing,
		DefaultPricing,
	);

	c.rcs<Mtm<H>>(
		Mtm,
		DefaultMtm,
	);


	c.ra(DefaultGetAvailable.TaskDeps, Tasks);
	c.ra(DefaultSettle.TaskDeps, Tasks);
	c.ra(DefaultMarginAccumulation.TaskDeps, Tasks);

	c.rcs<GetAvailableLike<H>>(TYPES.GetAvailableLike, DefaultGetAvailable);
	c.rcs<SettleLike>(TYPES.SettleLike, DefaultSettle);
	c.rcs<MarginAccumulationLike<H>>(TYPES.MarginAccumulationLike, DefaultMarginAccumulation);

	c.rcs<Tasks<H>>(
		Tasks,
		DefaultTasks,
	);

	c.rfs(
		UpdateTrades,
		() => new UpdateTrades(
			c.i<Context<H>>(Context),
			c.i(Models),
			c.i(Broadcast),
			c.i(Tasks),
			true,
		),
	);

	return c;
}

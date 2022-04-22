import { Texchange, Snapshot } from './texchange';
import { HLike } from 'interfaces';
import { TYPES } from '../types';

// Context
import { Context } from '../context';
import { Config } from '../context.d/config';
import {
	HStatic,
	Timeline,
} from 'interfaces';
import { DefaultMarketCalc } from '../context.d/market-calc/default';

// Models
import { Makers } from '../models.d/makers/makers';
import { DefaultMakers } from '../models.d/makers/default';
import { Pricing } from '../models.d/pricing/pricing';
import { DefaultPricing } from '../models.d/pricing/default';

import { Models } from '../models';

// Tasks
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


export class DefaultTexchange<H extends HLike<H>>
	extends Texchange<H, DefaultPricing.Snapshot>{

	public constructor(
		config: Config<H>,
		timeline: Timeline,
		H: HStatic<H>,
	) {
		super(config, timeline, H);

		this.c.rcs(
			TYPES.MarketCalc,
			DefaultMarketCalc,
		);

		this.c.rcs(
			Makers,
			DefaultMakers,
		);
		this.c.rcs(
			Pricing,
			DefaultPricing,
		);

		this.c.rcs(
			Mtm,
			DefaultMtm,
		);


		this.c.ra(DefaultGetAvailable.TaskDeps, Tasks);
		this.c.ra(DefaultSettle.TaskDeps, Tasks);
		this.c.ra(DefaultMarginAccumulation.TaskDeps, Tasks);

		this.c.rcs(TYPES.GetAvailableLike, DefaultGetAvailable);
		this.c.rcs(TYPES.SettleLike, DefaultSettle);
		this.c.rcs(TYPES.MarginAccumulationLike, DefaultMarginAccumulation);

		this.c.rcs(
			Tasks,
			DefaultTasks,
		);

		this.c.rfs(
			UpdateTrades,
			() => new UpdateTrades(
				this.c.i(Context),
				this.c.i(Models),
				this.c.i(TYPES.Broadcast),
				this.c.i(Tasks),
				true,
			),
		);

		this.c.rfs(Texchange, () => this);
		this.c.i(Texchange);
	}
}

export interface DefaultModels<H extends HLike<H>>
	extends Models<H, DefaultPricing.Snapshot> { }

export interface DefaultSnapshot
	extends Snapshot<DefaultPricing.Snapshot> { }

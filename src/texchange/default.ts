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

// Facades
import { Latency } from '../facades.d/latency';
import { Joystick } from '../facades.d/joystick';

import { Facades } from '../facades';



export class DefaultTexchange<H extends HLike<H>>
	extends Texchange<H, DefaultPricing.Snapshot>{

	protected models: Models<H, DefaultPricing.Snapshot>;
	protected mtm: Mtm<H> | null;
	public user: Latency<H>;
	public admin: Joystick<H>;

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

		this.models = this.c.i(Models);
		this.mtm = this.c.i(Mtm);
		const facades: Facades<H> = this.c.i(Facades);
		this.user = facades.latency;
		this.admin = facades.joystick;
	}

	public capture(): DefaultSnapshot {
		return {
			assets: this.models.assets.capture(),
			margins: this.models.margins.capture(),
			makers: this.models.makers.capture(),
			book: this.models.book.capture(),
			pricing: this.models.pricing.capture(),
			progress: this.models.progress.capture(),
		}
	}

	public restore(snapshot: DefaultSnapshot): void {
		this.models.assets.restore(snapshot.assets);
		this.models.margins.restore(snapshot.margins);
		this.models.makers.restore(snapshot.makers);
		this.models.book.restore(snapshot.book);
		this.models.pricing.restore(snapshot.pricing);
		this.models.progress.restore(snapshot.progress);
	}
}

export interface DefaultModels<H extends HLike<H>>
	extends Models<H, DefaultPricing.Snapshot> { }

export interface DefaultSnapshot
	extends Snapshot<DefaultPricing.Snapshot> { }

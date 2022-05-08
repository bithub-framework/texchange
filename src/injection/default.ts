import { HLike, HStatic } from 'secretary-like';
import { Container as BaseContainer } from './base-container';
import { TYPES } from './types';

// Context
import { Context } from '../context';
import { Config } from '../context.d/config';
import {
	TimelineLike,
	MarketCalc,
} from 'secretary-like';
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
import { Tasks } from '../tasks/tasks';
import { DefaultTasks } from '../tasks/default';

// Mark to market
import { Mtm } from '../mark-to-market/mtm';
import { DefaultMtm } from '../mark-to-market/default';

// Use cases
import { UpdateTrades } from '../use-cases.d/update-trades';


export class Container<H extends HLike<H>> extends BaseContainer<H> {
	public [TYPES.MarketCalc] = this.rcs<MarketCalc<H>>(DefaultMarketCalc);

	public [TYPES.Makers] = this.rcs<Makers<H>>(DefaultMakers);
	public [TYPES.Pricing] = this.rcs<Pricing<H, any>>(DefaultPricing);

	public [TYPES.Mtm] = this.rcs<Mtm<H>>(DefaultMtm);

	public [TYPES.Tasks] = this.rcs<Tasks<H>>(DefaultTasks);

	public [TYPES.UpdateTrades] = this.rfs<UpdateTrades<H>>(
		() => new UpdateTrades(
			this[TYPES.Context](),
			this[TYPES.Models](),
			this[TYPES.Broadcast](),
			this[TYPES.Tasks](),
			true,
		),
	);
}

import { HLike, HStatic } from 'secretary-like';
import { Container as BaseContainer } from '../container';
import { TYPES } from '../types';

// Context
import { Context } from '../../context';
import { Spec } from '../../context.d/spec';
import {
	TimelineLike,
	MarketCalc,
} from 'secretary-like';
import { DefaultMarketCalc } from '../../context.d/market-calc/default';

// Models
import { Makers } from '../../models.d/makers/makers';
import { DefaultMakers } from '../../models.d/makers/default';
import { Pricing } from '../../models.d/pricing/pricing';
import { DefaultPricing } from '../../models.d/pricing/default';

import { Models } from '../../texchange/models';

//Broadcast
import { Broadcast } from '../../broadcast';

// Tasks
import { Tasks } from '../../texchange/tasks';
import * as TASKS from '../../tasks.d';
import { DefaultGetAvailable } from '../../tasks.d/get-available/default';
import { DefaultMarginAccumulation } from '../../tasks.d/margin-accumulation/default';
import { DefaultSettle } from '../../tasks.d/settle/default';

// Mark to market
import { Mtm } from '../../mark-to-market/mtm';
import { DefaultMtm } from '../../mark-to-market/default';

// Use cases
import { UpdateTrades } from '../../use-cases.d/update-trades';


export class Container<H extends HLike<H>> extends BaseContainer<H> {
	public [TYPES.HStatic]: () => HStatic<H>;
	public [TYPES.spec]: () => Spec<H>;
	public [TYPES.TimelineLike]: () => TimelineLike;

	public [TYPES.MarketCalc] = this.rcs<MarketCalc<H>>(DefaultMarketCalc);

	public [TYPES.MODELS.Makers] = this.rcs<Makers<H>>(DefaultMakers);
	public [TYPES.MODELS.Pricing] = this.rcs<Pricing<H, any>>(DefaultPricing);

	public [TYPES.TASKS.GetAvailable] = this.rcs<TASKS.GetAvailableLike<H>>(DefaultGetAvailable);
	public [TYPES.TASKS.MarginAccumulation] = this.rcs<TASKS.MarginAccumulationLike<H>>(DefaultMarginAccumulation);
	public [TYPES.TASKS.Settle] = this.rcs<TASKS.SettleLike>(DefaultSettle);

	public [TYPES.Mtm] = this.rcs<Mtm<H>>(DefaultMtm);

	public [TYPES.USE_CASES.realTimeSettlement] = this.rv(true);

	public constructor(
		timeline: TimelineLike,
		H: HStatic<H>,
		spec: Spec<H>,
	) {
		super();

		this[TYPES.spec] = this.rv(spec);
		this[TYPES.TimelineLike] = this.rv(timeline);
		this[TYPES.HStatic] = this.rv(H);
	}
}

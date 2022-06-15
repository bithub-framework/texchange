import { HLike, HStatic } from 'secretary-like';
import { Container as BaseContainer } from '../container';
import { TYPES } from '../types';

// Context
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

// Tasks
import { TaskGetAvailable } from '../../tasks.d/get-available/get-available';
import { TaskMarginAccumulation } from '../../tasks.d/margin-accumulation/margin-accumulation';
import { TaskSettle } from '../../tasks.d/settle/settle';
import { DefaultTaskGetAvailable } from '../../tasks.d/get-available/default';
import { DefaultTaskMarginAccumulation } from '../../tasks.d/margin-accumulation/default';
import { DefaultTaskSettle } from '../../tasks.d/settle/default';

// Mark to market
import { Mtm } from '../../mark-to-market/mtm';
import { DefaultMtm } from '../../mark-to-market/default';

// Facades
import { Config as DelayConfig } from '../../facades.d/config';


export class Container<H extends HLike<H>> extends BaseContainer<H> {
	public [TYPES.hStatic]: () => HStatic<H>;
	public [TYPES.spec]: () => Spec<H>;
	public [TYPES.timeline]: () => TimelineLike;

	public [TYPES.marketCalc] = this.rcs<MarketCalc<H>>(DefaultMarketCalc);

	public [TYPES.MODELS.makers] = this.rcs<Makers<H>>(DefaultMakers);
	public [TYPES.MODELS.pricing] = this.rcs<Pricing<H, any>>(DefaultPricing);

	public [TYPES.TASKS.getAvailable] = this.rcs<TaskGetAvailable<H>>(DefaultTaskGetAvailable);
	public [TYPES.TASKS.marginAccumulation] = this.rcs<TaskMarginAccumulation<H>>(DefaultTaskMarginAccumulation);
	public [TYPES.TASKS.settle] = this.rcs<TaskSettle<H>>(DefaultTaskSettle);

	public [TYPES.mtm] = this.rcs<Mtm<H>>(DefaultMtm);

	public [TYPES.USE_CASES.realTimeSettlement] = this.rv(true);

	public [TYPES.FACADES.config] = this.rv<DelayConfig>({
		ping: 20,
		processing: 20,
	});

	public constructor(
		timeline: TimelineLike,
		H: HStatic<H>,
		spec: Spec<H>,
	) {
		super();

		this[TYPES.spec] = this.rv(spec);
		this[TYPES.timeline] = this.rv(timeline);
		this[TYPES.hStatic] = this.rv(H);
	}
}

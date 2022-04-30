import {
	HLike,
	MarketCalc,
	TimelineLike,
	HStatic,
} from 'interfaces';
import { Config } from './context.d/config';
import { inject } from 'injektor';
import { TYPES } from './types';


export class Context<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.MarketCalc)
		public calc: MarketCalc<H>,
		public config: Config<H>,
		public timeline: TimelineLike,
		public H: HStatic<H>,
	) { }
}

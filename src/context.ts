import {
	HLike,
	MarketCalc,
	Timeline,
	HStatic,
} from 'interfaces';
import { Config } from './context.d/config';
import { instantInject } from 'injektor';
import { TYPES } from './types';


export class Context<H extends HLike<H>> {
	@instantInject(TYPES.MarketCalc)
	public calc!: MarketCalc<H>;

	public constructor(
		public config: Config<H>,
		public timeline: Timeline,
		public H: HStatic<H>,
	) { }
}

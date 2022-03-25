import { Config } from '../context.d/config';
import {
	Timeline,
	MarketCalc,
	HStatic, HLike,
} from 'interfaces';


export abstract class Context<H extends HLike<H>> {
	public abstract calc: MarketCalc<H>;

	public constructor(
		public config: Config<H>,
		public timeline: Timeline,
		public H: HStatic<H>,
	) { }
}

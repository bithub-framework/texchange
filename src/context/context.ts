import { Config } from '../context.d/config';
import { Timeline, MarketCalc } from 'interfaces';
import {
	HStatic, HLike,
} from 'interfaces';


export abstract class Context<H extends HLike<H>> {
	public abstract calc: MarketCalc<H>;

	constructor(
		public readonly config: Config<H>,
		public readonly timeline: Timeline,
		public readonly H: HStatic<H>,
	) { }
}

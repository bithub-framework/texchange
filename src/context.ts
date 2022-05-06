import {
	HLike,
	MarketCalc,
	TimelineLike,
} from 'secretary-like';
import { Config } from './context.d/config';
import { DataStatic } from './interfaces/data';


export class Context<H extends HLike<H>> {
	public constructor(
		public calc: MarketCalc<H>,
		public config: Config<H>,
		public timeline: TimelineLike,
		public Data: DataStatic<H>,
	) { }
}

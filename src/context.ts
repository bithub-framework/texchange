import {
	HLike,
	MarketCalc,
	TimelineLike,
} from 'secretary-like';
import { Config } from './context.d/config';
import { inject } from 'injektor';
import { TYPES } from './types';
import { DataStatic } from './interfaces/data';


export class Context<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.MarketCalc)
		public calc: MarketCalc<H>,
		public config: Config<H>,
		public timeline: TimelineLike,
		public Data: DataStatic<H>,
	) { }
}

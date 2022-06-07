import {
	HLike,
	MarketCalc,
	TimelineLike,
} from 'secretary-like';
import { Config } from './context.d/config';
import { DataStatic } from './interfaces/data';
import { inject } from '@zimtsui/injektor';
import { TYPES } from './injection/types';


export class Context<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.MarketCalc)
		public calc: MarketCalc<H>,
		@inject(TYPES.Config)
		public config: Config<H>,
		@inject(TYPES.TimelineLike)
		public timeline: TimelineLike,
		@inject(TYPES.DataStatic)
		public Data: DataStatic<H>,
	) { }
}

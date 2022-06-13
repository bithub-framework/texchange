import {
	HLike,
	MarketCalc,
	TimelineLike,
} from 'secretary-like';
import { Spec } from './context.d/spec';
import { DataStatic } from './interfaces/data';
import { inject } from '@zimtsui/injektor';
import { TYPES } from './injection/types';


export class Context<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.MarketCalc)
		public calc: MarketCalc<H>,
		@inject(TYPES.spec)
		public spec: Spec<H>,
		@inject(TYPES.TimelineLike)
		public timeline: TimelineLike,
		@inject(TYPES.DataStatic)
		public Data: DataStatic<H>,
	) { }
}

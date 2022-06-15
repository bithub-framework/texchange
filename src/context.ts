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
		@inject(TYPES.marketCalc)
		public calc: MarketCalc<H>,
		@inject(TYPES.spec)
		public spec: Spec<H>,
		@inject(TYPES.timeline)
		public timeline: TimelineLike,
		@inject(TYPES.dataStatic)
		public Data: DataStatic<H>,
	) { }
}

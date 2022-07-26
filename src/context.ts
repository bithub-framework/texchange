import {
	HLike,
	TimelineLike,
} from 'secretary-like';
import { DataNamespace } from './interfaces/data';
import { inject } from '@zimtsui/injektor';
import { TYPES } from './injection/types';


export class Context<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.timeline)
		public timeline: TimelineLike,
		@inject(TYPES.dataStatic)
		public Data: DataNamespace<H>,
	) { }
}

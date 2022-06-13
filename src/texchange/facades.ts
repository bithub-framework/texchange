import { Instant } from '../facades.d/instant';
import { Latency } from '../facades.d/latency/latency';
import { Joystick } from '../facades.d/joystick';
import { HLike } from 'secretary-like';
import { Context } from '../context';
import { Models } from './models';
import { Mtm } from '../mark-to-market/mtm';
import { UseCases } from './use-cases';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class Facades<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.Instant)
		public instant: Instant<H>,
		@inject(TYPES.Latency)
		public latency: Latency<H>,
		@inject(TYPES.Joystick)
		public joystick: Joystick<H>,
	) { }
}

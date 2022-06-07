import { Instant } from './facades.d/instant';
import { Latency } from './facades.d/latency/latency';
import { Joystick } from './facades.d/joystick';
import { HLike } from 'secretary-like';
import { Context } from './context';
import { Models } from './models';
import { Mtm } from './mark-to-market/mtm';
import { UseCases } from './use-cases';
import { inject } from '@zimtsui/injektor';
import { TYPES } from './injection/types';



export class Facades<H extends HLike<H>> {
	public instant: Instant<H>;
	public latency: Latency<H>;
	public joystick: Joystick<H>;

	public constructor(
		@inject(TYPES.Context)
		context: Context<H>,
		@inject(TYPES.Models)
		models: Models<H>,
		@inject(TYPES.Mtm)
		mtm: Mtm<H> | null,
		@inject(TYPES.UseCases)
		useCases: UseCases<H>,
	) {
		this.instant = new Instant(context, useCases);
		this.latency = new Latency(context, useCases, this.instant);
		this.joystick = new Joystick(context, models, mtm, useCases);
	}
}

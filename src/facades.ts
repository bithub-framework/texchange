import { Instant } from './facades.d/instant';
import { Latency } from './facades.d/latency/latency';
import { Joystick } from './facades.d/joystick';
import { HLike } from 'interfaces';
import { Context } from './context';
import { UseCases } from './use-cases';
import { inject } from 'injektor';



export class Facades<H extends HLike<H>> {
	public instant: Instant<H>;
	public latency: Latency<H>;
	public joystick: Joystick<H>;

	public constructor(
		@inject(Context)
		context: Context<H>,
		@inject(UseCases)
		useCases: UseCases<H>,
	) {
		this.instant = new Instant(context, useCases);
		this.latency = new Latency(context, useCases, this.instant);
		this.joystick = new Joystick(context, useCases);
	}
}

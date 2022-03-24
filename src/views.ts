import { Context } from './context/context';
import { UseCases } from './use-cases/use-cases';

import { Instant } from './views.d/instant';
import { Latency } from './views.d/latency';
import { Joystick } from './views.d/joystick';

import { HLike } from 'interfaces';


export class Views<H extends HLike<H>> {
	public readonly instant: Instant<H>;
	public readonly latency: Latency<H>;
	public readonly joystick: Joystick<H>;

	public constructor(
		context: Context<H>,
		useCases: UseCases<H>,
	) {
		this.instant = new Instant(context, useCases);
		this.latency = new Latency(context, useCases, this.instant);
		this.joystick = new Joystick(context, useCases);
	}
}

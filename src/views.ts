import { Context } from './context';
import { UseCasesLike } from './use-cases';

import { Instant } from './views.d/instant';
import { Latency } from './views.d/latency';
import { Joystick } from './views.d/joystick';


export class Views {
	public readonly instant: Instant;
	public readonly latency: Latency;
	public readonly joystick: Joystick;

	constructor(
		context: Context,
		useCases: UseCasesLike,
	) {
		this.instant = new Instant(context, useCases);
		this.latency = new Latency(context, this.instant);
		this.joystick = new Joystick(context, useCases);
	}
}

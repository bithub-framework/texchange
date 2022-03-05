import { Context } from './context';
import { UseCases } from './use-cases';

import { Instant } from './views.d/instant';
import { Latency } from './views.d/latency';
import { Joystick } from './views.d/joystick';


export class Views {
	public readonly instant: Instant;
	public readonly latency: Latency;
	public readonly joystick: Joystick;

	constructor(
		protected readonly context: Context,
		protected readonly useCases: UseCases,
	) {
		this.instant = new Instant(this.context, this.useCases);
		this.latency = new Latency(this.context, this.instant);
		this.joystick = new Joystick(this.context, this.useCases);
	}
}

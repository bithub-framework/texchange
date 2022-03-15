import { Context } from './context';
import { UseCasesLike } from './use-cases';

import { Instant } from './views.d/instant';
import { Latency } from './views.d/latency';
import { Joystick } from './views.d/joystick';

import { HLike } from 'interfaces';


export class Views<H extends HLike<H>> {
	public readonly instant: Instant<H>;
	public readonly latency: Latency<H>;
	public readonly joystick: Joystick<H>;

	constructor(
		context: Context<H>,
		useCases: UseCasesLike<H>,
	) {
		this.instant = new Instant(context, useCases);
		this.latency = new Latency(context, this.instant);
		this.joystick = new Joystick(context, useCases);
	}
}

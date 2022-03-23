import {
	HLike,
} from 'interfaces';
import { Context } from '../../context';
import { Models } from '../../models/models';
import { Tasks } from '../../tasks/tasks';
import { Broadcast } from '../../broadcast';
import { MarginAccumulation } from './margin-accumulation';


export class DefaultMarginAccumulation<H extends HLike<H>>
	extends MarginAccumulation<H> {
	public constructor(
		protected readonly context: Context<H>,
		protected readonly models: Models<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: Tasks<H>,
	) { super(); }

	public newMarginAfterOpening({
		length,
		volume,
		dollarVolume,
	}: MarginAccumulation.Volumes<H>): H {
		const increment = dollarVolume.div(this.context.config.account.LEVERAGE);
		return this.models.margins.getMargin()[length].plus(increment);
	}

	public newMarginAfterClosing({
		length,
		volume,
		dollarVolume,
	}: MarginAccumulation.Volumes<H>): H {
		if (volume.eq(this.models.assets.getPosition()[length]))
			return this.context.H.from(0);
		const margin = this.models.margins.getMargin()[length];
		const decrement = margin
			.times(volume)
			.div(this.models.assets.getPosition()[length]);
		return margin.minus(decrement);
	}
}

export namespace DefaultMarginAccumulation {
	export type Volumes<H extends HLike<H>>
		= MarginAccumulation.Volumes<H>;

	export interface ModelDeps<H extends HLike<H>>
		extends MarginAccumulation.ModelDeps<H> { }

	export interface TaskDeps<H extends HLike<H>>
		extends MarginAccumulation.TaskDeps<H> { }
}

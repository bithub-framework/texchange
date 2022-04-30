import { HLike } from 'interfaces';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { MarginAccumulation } from './margin-accumulation';
import { Margins } from '../../models.d/margins';
import { Assets } from '../../models.d/assets';



export class DefaultMarginAccumulation<H extends HLike<H>>
	extends MarginAccumulation<H> {

	public constructor(
		protected tasks: DefaultMarginAccumulation.TaskDeps<H>,

		context: Context<H>,
		protected models: DefaultMarginAccumulation.ModelDeps<H>,
		broadcast: Broadcast<H>,
	) {
		super(
			context,
			models,
			broadcast,
		);
	}

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
			return new this.context.H(0);
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
		extends MarginAccumulation.ModelDeps<H> {
		margins: Margins<H>;
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>>
		extends MarginAccumulation.TaskDeps<H> { }
}

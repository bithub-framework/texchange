import { HLike } from 'secretary-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { MarginAccumulation } from './margin-accumulation';
import { Margins } from '../../models.d/margins';
import { Assets } from '../../models.d/assets';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/default/types';


export class DefaultMarginAccumulation<H extends HLike<H>>
	extends MarginAccumulation<H> {

	public constructor(
		@inject(TYPES.Context)
		protected context: Context<H>,
		@inject(TYPES.Models)
		protected models: DefaultMarginAccumulation.ModelDeps<H>,
		@inject(TYPES.Broadcast)
		protected broadcast: Broadcast<H>,
	) {
		super();
	}

	public newMarginAfterOpening({
		length,
		volume,
		dollarVolume,
	}: MarginAccumulation.Volumes<H>): H {
		const increment = dollarVolume.div(this.context.spec.account.LEVERAGE);
		return this.models.margins.getMargin()[length].plus(increment);
	}

	public newMarginAfterClosing({
		length,
		volume,
		dollarVolume,
	}: MarginAccumulation.Volumes<H>): H {
		if (volume.eq(this.models.assets.getPosition()[length]))
			return new this.context.Data.H(0);
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

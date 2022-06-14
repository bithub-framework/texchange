import { HLike } from 'secretary-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { TaskMarginAccumulation } from './margin-accumulation';
import { Margins } from '../../models.d/margins';
import { Assets } from '../../models.d/assets';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/default/types';


export class DefaultTaskMarginAccumulation<H extends HLike<H>>
	extends TaskMarginAccumulation<H> {

	public constructor(
		@inject(TYPES.Context)
		protected context: Context<H>,
		@inject(TYPES.Models)
		protected models: DefaultTaskMarginAccumulation.ModelDeps<H>,
		@inject(TYPES.Broadcast)
		protected broadcast: Broadcast<H>,
	) {
		super();
	}

	public newMarginAfterOpening({
		length,
		volume,
		dollarVolume,
	}: TaskMarginAccumulation.Volumes<H>): H {
		const increment = dollarVolume.div(this.context.spec.account.LEVERAGE);
		return this.models.margins.getMargin()[length].plus(increment);
	}

	public newMarginAfterClosing({
		length,
		volume,
		dollarVolume,
	}: TaskMarginAccumulation.Volumes<H>): H {
		if (volume.eq(this.models.assets.getPosition()[length]))
			return new this.context.Data.H(0);
		const margin = this.models.margins.getMargin()[length];
		const decrement = margin
			.times(volume)
			.div(this.models.assets.getPosition()[length]);
		return margin.minus(decrement);
	}
}

export namespace DefaultTaskMarginAccumulation {
	export type Volumes<H extends HLike<H>>
		= TaskMarginAccumulation.Volumes<H>;

	export interface ModelDeps<H extends HLike<H>>
		extends TaskMarginAccumulation.ModelDeps<H> {
		margins: Margins<H>;
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>>
		extends TaskMarginAccumulation.TaskDeps<H> { }
}

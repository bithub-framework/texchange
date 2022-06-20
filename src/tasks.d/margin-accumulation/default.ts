import {
	HLike,
	AccountSpec,
} from 'secretary-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { TaskMarginAccumulation } from './margin-accumulation';
import { MarginAssets } from '../../models.d/margin-assets/margin-assets';
import { Assets } from '../../models.d/margin-assets/assets';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/default/types';


export class DefaultTaskMarginAccumulation<H extends HLike<H>>
	extends TaskMarginAccumulation<H> {

	public constructor(
		@inject(TYPES.context)
		protected context: Context<H>,
		@inject(TYPES.accountSpec)
		private accountSpec: AccountSpec,
		@inject(TYPES.models)
		protected models: DefaultTaskMarginAccumulation.ModelDeps<H>,
	) {
		super();
	}

	public newMarginAfterOpening({
		length,
		volume,
		dollarVolume,
	}: TaskMarginAccumulation.Volumes<H>): H {
		const increment = dollarVolume.div(this.accountSpec.LEVERAGE);
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
		margins: MarginAssets<H>;
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>>
		extends TaskMarginAccumulation.TaskDeps<H> { }
}

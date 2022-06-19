import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	HLike, Length,
	MarketSpec,
} from 'secretary-like';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { TaskMarginAccumulation } from './margin-accumulation/margin-accumulation';
import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';


export class TaskOrderVolumes<H extends HLike<H>> {
	@instantInject(TYPES.tasks)
	private tasks!: TaskOrderVolumes.TaskDeps<H>;

	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.marketSpec)
		private marketSpec: MarketSpec<H>,
		@inject(TYPES.models)
		private models: TaskOrderVolumes.ModelDeps<H>,
		@inject(TYPES.broadcast)
		private broadcast: Broadcast<H>,
	) { }

	public open({
		length, volume, dollarVolume,
	}: TaskOrderVolumes.Volumes<H>): void {
		const newMargin = this.tasks.marginAccumulation.newMarginAfterOpening({
			length,
			volume,
			dollarVolume,
		}).round(this.marketSpec.CURRENCY_DP);
		this.models.assets.open(
			length,
			volume,
			dollarVolume,
		);
		this.models.margins.setMargin(length, newMargin);
	}

	public close({
		length, volume, dollarVolume,
	}: TaskOrderVolumes.Volumes<H>): void {
		const position = this.models.assets.getPosition()[length];
		if (volume.gt(position)) {
			const openVolume = volume.minus(position);
			const openDollarVolume = dollarVolume
				.times(openVolume)
				.div(volume)
				.round(this.marketSpec.CURRENCY_DP);
			const closeDollarVolume = dollarVolume
				.minus(openDollarVolume);
			this.close({
				length,
				volume: position,
				dollarVolume: closeDollarVolume
			});
			this.open({
				length: -length,
				volume: openDollarVolume,
				dollarVolume: openDollarVolume,
			});
		} else {
			const newMargin = this.tasks.marginAccumulation.newMarginAfterClosing({
				length,
				volume,
				dollarVolume,
			}).round(this.marketSpec.CURRENCY_DP);
			this.models.assets.close(
				length,
				volume,
				dollarVolume,
			);
			this.models.margins.setMargin(length, newMargin);
		}
	}
}

export namespace TaskOrderVolumes {
	export interface Volumes<H extends HLike<H>> {
		length: Length;
		volume: H;
		dollarVolume: H;
	}

	export interface ModelDeps<H extends HLike<H>> {
		assets: Assets<H>;
		margins: Margins<H>;
	}

	export interface TaskDeps<H extends HLike<H>> {
		marginAccumulation: TaskMarginAccumulation<H>;
	}
}

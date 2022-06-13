import { Context } from '../../context';
import { OrderVolumesLike } from './order-volumes-like';
import { Broadcast } from '../../broadcast';
import { HLike } from 'secretary-like';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';

import { MarginAccumulationLike } from '../margin-accumulation/margin-accumulation-like';
import { Assets } from '../../models.d/assets';
import { Margins } from '../../models.d/margins';


export class OrderVolumes<H extends HLike<H>>
	implements OrderVolumesLike<H>
{
	@instantInject(TYPES.Tasks)
	private tasks!: OrderVolumes.TaskDeps<H>;

	public constructor(
		@inject(TYPES.Context)
		private context: Context<H>,
		@inject(TYPES.Models)
		private models: OrderVolumes.ModelDeps<H>,
		@inject(TYPES.Broadcast)
		private broadcast: Broadcast<H>,
	) { }

	public open({
		length, volume, dollarVolume,
	}: OrderVolumesLike.Volumes<H>): void {
		const newMargin = this.tasks.marginAccumulation.newMarginAfterOpening({
			length,
			volume,
			dollarVolume,
		}).round(this.context.spec.market.CURRENCY_DP);
		this.models.assets.open(
			length,
			volume,
			dollarVolume,
		);
		this.models.margins.setMargin(length, newMargin);
	}

	public close({
		length, volume, dollarVolume,
	}: OrderVolumesLike.Volumes<H>): void {
		const position = this.models.assets.getPosition()[length];
		if (volume.gt(position)) {
			const openVolume = volume.minus(position);
			const openDollarVolume = dollarVolume
				.times(openVolume)
				.div(volume)
				.round(this.context.spec.market.CURRENCY_DP);
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
			}).round(this.context.spec.market.CURRENCY_DP);
			this.models.assets.close(
				length,
				volume,
				dollarVolume,
			);
			this.models.margins.setMargin(length, newMargin);
		}
	}
}

export namespace OrderVolumes {
	export interface Volumes<H extends HLike<H>>
		extends OrderVolumesLike.Volumes<H> { }

	export interface ModelDeps<H extends HLike<H>> {
		assets: Assets<H>;
		margins: Margins<H>;
	}

	export interface TaskDeps<H extends HLike<H>> {
		marginAccumulation: MarginAccumulationLike<H>;
	}
}

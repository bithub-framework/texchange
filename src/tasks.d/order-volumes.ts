import { Context } from '../context';
import { Models } from '../models/models';
import { Task } from '../task';
import { Tasks, OrderVolumesLike } from '../tasks/tasks';
import { Broadcast } from '../broadcast';
import {
	HLike,
} from 'interfaces';


export class OrderVolumes<H extends HLike<H>>
	extends Task<H>
	implements OrderVolumesLike<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: Models<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: Tasks<H>,
	) { super(); }

	public open({
		length, volume, dollarVolume,
	}: OrderVolumesLike.Volumes<H>): void {
		const newMargin = this.tasks.marginAccumulation.newMarginAfterOpening({
			length,
			volume,
			dollarVolume,
		}).round(this.context.config.market.CURRENCY_DP);
		this.models.assets.open({
			length,
			volume,
			dollarVolume,
		});
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
				.round(this.context.config.market.CURRENCY_DP);
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
			}).round(this.context.config.market.CURRENCY_DP);
			this.models.assets.close({
				length,
				volume,
				dollarVolume,
			});
			this.models.margins.setMargin(length, newMargin);
		}
	}
}

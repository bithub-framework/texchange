import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, OrderVolumesLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';


export class OrderVolumes extends Task implements OrderVolumesLike {
	constructor(
		protected readonly context: Context,
		protected readonly models: StatefulModels,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
	) { super(); }

	public open({
		length, volume, dollarVolume,
	}: OrderVolumesLike.Volumes): void {
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
	}: OrderVolumesLike.Volumes): void {
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

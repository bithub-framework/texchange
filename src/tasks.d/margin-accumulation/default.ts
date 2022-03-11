import {
	Length,
} from 'interfaces';
import Big from 'big.js';
import { Context } from '../../context';
import { StatefulModels } from '../../models/stateful-models';
import assert = require('assert');
import { TasksLike } from '../../tasks/tasks-like';
import { Broadcast } from '../../broadcast';
import { MarginAccumulation } from './margin-accumulation';


export class DefaultMarginAccumulation extends MarginAccumulation {
	constructor(
		protected readonly context: Context,
		protected readonly models: StatefulModels,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
	) { super(); }

	public newMarginAfterOpening({
		length,
		volume,
		dollarVolume,
	}: MarginAccumulation.Volumes): Big {
		const increment = dollarVolume.div(this.context.config.account.LEVERAGE);
		return this.models.margins.getMargin()[length].plus(increment);
	}

	public newMarginAfterClosing({
		length,
		volume,
		dollarVolume,
	}: MarginAccumulation.Volumes): Big {
		if (volume.eq(this.models.assets.getPosition()[length]))
			return new Big(0);
		const margin = this.models.margins.getMargin()[length];
		const decrement = margin
			.times(volume)
			.div(this.models.assets.getPosition()[length]);
		return margin.minus(decrement);
	}
}

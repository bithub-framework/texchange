import {
	Tasks,
	GetAvailableLike,
	SettleLike,
	MarginAccumulationLike,
} from './tasks';

import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { Models } from '../models/models';

import { DefaultGetAvailable } from '../tasks.d/get-available/default';
import { DefaultSettle } from '../tasks.d/settle/default';
import { DefaultMarginAccumulation } from '../tasks.d/margin-accumulation/default';

import { HLike } from 'interfaces';

export class DefaultTasks<H extends HLike<H>>
	extends Tasks<H> {
	public readonly getAvailable: GetAvailableLike<H>;
	public readonly settle: SettleLike;
	public readonly marginAccumulation: MarginAccumulationLike<H>;

	constructor(
		context: Context<H>,
		models: Models<H>,
		broadcast: Broadcast<H>,
	) {
		super(
			context,
			models,
			broadcast,
		);

		this.getAvailable = new DefaultGetAvailable(context, models, broadcast, this);
		this.settle = new DefaultSettle(context, models, broadcast, this);
		this.marginAccumulation = new DefaultMarginAccumulation(context, models, broadcast, this);
	}
}

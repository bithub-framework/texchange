import { Tasks } from './tasks';

import { Context } from '../context/context';
import { Broadcast } from '../broadcast';
import { Models } from '../models/models';

import { GetAvailableLike } from '../tasks.d/get-available/get-available-like';
import { SettleLike } from '../tasks.d/settle/settle-like';
import { MarginAccumulationLike } from '../tasks.d/margin-accumulation/margin-accumulation-like';

import { DefaultGetAvailable } from '../tasks.d/get-available/default';
import { DefaultSettle } from '../tasks.d/settle/default';
import { DefaultMarginAccumulation } from '../tasks.d/margin-accumulation/default';

import { HLike } from 'interfaces';

export class DefaultTasks<H extends HLike<H>>
	extends Tasks<H> {
	public getAvailable: GetAvailableLike<H>;
	public settle: SettleLike;
	public marginAccumulation: MarginAccumulationLike<H>;

	public constructor(
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

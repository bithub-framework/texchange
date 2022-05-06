import { Tasks } from './tasks';

import { Context } from '../context';
import { Models } from '../models';
import { Broadcast } from '../broadcast';
import { inject } from 'injektor';

import { GetAvailableLike } from '../tasks.d/get-available/get-available-like';
import { MarginAccumulationLike } from '../tasks.d/margin-accumulation/margin-accumulation-like';
import { SettleLike } from '../tasks.d/settle/settle-like';

import { DefaultGetAvailable } from '../tasks.d/get-available/default';
import { DefaultMarginAccumulation } from '../tasks.d/margin-accumulation/default';
import { DefaultSettle } from '../tasks.d/settle/default';

import { HLike } from 'secretary-like';

export class DefaultTasks<H extends HLike<H>>
	extends Tasks<H> implements
	DefaultGetAvailable.TaskDeps<H>,
	DefaultSettle.TaskDeps<H>,
	DefaultMarginAccumulation.TaskDeps<H>{
	public getAvailable: GetAvailableLike<H>;
	public settle: SettleLike;
	public marginAccumulation: MarginAccumulationLike<H>;

	public constructor(
		@inject(Context)
		context: Context<H>,
		@inject(Models)
		models: Models<H>,
		@inject(Broadcast)
		broadcast: Broadcast<H>,
	) {
		super(
			context,
			models,
			broadcast,
		);
		this.getAvailable = new DefaultGetAvailable(this, context, models, broadcast);
		this.settle = new DefaultSettle(this, context, models, broadcast);
		this.marginAccumulation = new DefaultMarginAccumulation(this, context, models, broadcast);
	}
}

import Big from 'big.js';
import { Context } from '../../context';
import { StatefulModels } from '../../models/stateful-models';
import { Task } from '../../task';
import { TasksLike, GetAvailableLike } from '../../tasks/tasks-like';
import { Broadcast } from '../../broadcast';


export abstract class GetAvailable extends Task
	implements GetAvailableLike {

	protected abstract readonly context: Context;
	protected abstract readonly models: StatefulModels;
	protected abstract readonly broadcast: Broadcast;
	protected abstract readonly tasks: TasksLike;

	public getAvailable(): Big {
		return this.models.assets.getBalance()
			.minus(this.finalMargin())
			.minus(this.finalFrozenBalance())
			.round(this.context.config.market.CURRENCY_DP);
	}

	protected abstract finalMargin(): Big;
	protected abstract finalFrozenBalance(): Big;
}

import Big from 'big.js';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { TasksLike, GetAvailableLike } from '../tasks-like';
import { Broadcast } from '../broadcast';


export abstract class GetAvailable extends Task
	implements GetAvailableLike {

	protected abstract context: Context;
	protected abstract models: Models;
	protected abstract broadcast: Broadcast;
	protected abstract tasks: TasksLike;

	public getAvailable(): Big {
		return this.models.assets.balance
			.minus(this.finalMargin())
			.minus(this.finalFrozenBalance())
			.round(this.context.config.CURRENCY_DP);
	}

	protected abstract finalMargin(): Big;
	protected abstract finalFrozenBalance(): Big;
}

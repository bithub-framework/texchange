import { Models } from '../models';
import { Context } from '../context';
import {
	Balances,
} from 'interfaces';
import { Task } from './task';
import { Broadcast } from '../broadcast';
import { TasksLike, GetBalancesLike } from '../tasks-like';


export class GetBalances extends Task
	implements GetBalancesLike {
	constructor(
		protected readonly context: Context,
		protected readonly models: Models,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
	) { super(); }

	public getBalances(): Balances {
		return {
			balance: this.models.assets.balance,
			available: this.tasks.getAvailable.getAvailable(),
			time: this.context.timeline.now(),
		};
	}
}

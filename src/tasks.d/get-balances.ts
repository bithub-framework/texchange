import { Models } from '../models';
import { Context } from '../context';
import {
	Balances,
} from 'interfaces';
import { Task } from './task';
import { Broadcast } from '../broadcast';
import { Tasks, GetBalancesLike } from '../tasks';


export class GetBalances extends Task
	implements GetBalancesLike {
	constructor(
		protected context: Context,
		protected models: Models,
		protected broadcast: Broadcast,
		protected tasks: Tasks,
	) {
		super();
	}

	public getBalances(): Balances {
		return {
			balance: this.models.assets.balance,
			available: this.tasks.getAvailable.getAvailable(),
			time: this.context.timeline.now(),
		};
	}
}

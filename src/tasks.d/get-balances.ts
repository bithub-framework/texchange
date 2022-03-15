import { StatefulModels } from '../models/stateful-models';
import { Context } from '../context';
import {
	Balances,
	HLike,
} from 'interfaces';
import { Task } from '../task';
import { Broadcast } from '../broadcast';
import { TasksLike, GetBalancesLike } from '../tasks/tasks-like';


export class GetBalances<H extends HLike<H>> extends Task<H>
	implements GetBalancesLike<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: StatefulModels<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: TasksLike<H>,
	) { super(); }

	public getBalances(): Balances<H> {
		return {
			balance: this.models.assets.getBalance(),
			available: this.tasks.getAvailable.getAvailable(),
			time: this.context.timeline.now(),
		};
	}
}

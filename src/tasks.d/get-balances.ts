import { Models } from '../models/models';
import { Context } from '../context';
import {
	Balances,
	HLike,
} from 'interfaces';
import { Task } from '../task';
import { Broadcast } from '../broadcast';
import { Tasks, GetBalancesLike } from '../tasks/tasks';


export class GetBalances<H extends HLike<H>> extends Task<H>
	implements GetBalancesLike<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: Models<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: Tasks<H>,
	) { super(); }

	public getBalances(): Balances<H> {
		return {
			balance: this.models.assets.getBalance(),
			available: this.tasks.getAvailable.getAvailable(),
			time: this.context.timeline.now(),
		};
	}
}

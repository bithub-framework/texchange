import { StatefulModels } from '../models/stateful-models';
import { Context } from '../context';
import { TasksLike } from '../tasks/tasks-like';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import {
	Balances,
	HLike,
} from 'interfaces';


export class GetBalances<H extends HLike<H>> extends UseCase<H> {

	constructor(
		protected readonly context: Context<H>,
		protected readonly models: StatefulModels<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: TasksLike<H>,
	) { super(); }

	public getBalances(): Balances<H> {
		return this.tasks.getBalances.getBalances();
	}
}

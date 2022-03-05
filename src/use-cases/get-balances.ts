import { Models } from '../models';
import { Context } from '../context';
import { TasksLike } from '../tasks-like';
import { UseCase } from './use-case';
import { Broadcast } from '../broadcast';
import {
	Balances,
} from 'interfaces';


export class GetBalances extends UseCase {

	constructor(
		protected readonly context: Context,
		protected readonly models: Models,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
	) { super(); }

	public getBalances(): Balances {
		return this.tasks.getBalances.getBalances();
	}
}

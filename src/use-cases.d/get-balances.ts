import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import { UseCase } from './use-case';
import {
	Balances,
} from '../interfaces';


export class GetBalances extends UseCase {

	constructor(
		protected context: Context,
		protected models: Models,
		protected tasks: Tasks,
	) {
		super(context, models, tasks);
	}

	public getBalances(): Balances {
		return this.tasks.getBalances.getBalances();
	}
}

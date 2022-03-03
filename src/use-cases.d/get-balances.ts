import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import { UseCase } from './use-case';
import { Broadcast } from '../broadcast';
import {
	Balances,
} from 'interfaces';


export class GetBalances extends UseCase {

	constructor(
		protected context: Context,
		protected models: Models,
		protected broadcast: Broadcast,
		protected tasks: Tasks,
	) {
		super();
	}

	public getBalances(): Balances {
		return this.tasks.getBalances.getBalances();
	}
}

import { Models } from '../models/models';
import { Context } from '../context';
import { Tasks } from '../tasks/tasks';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import {
	Balances,
	HLike,
} from 'interfaces';


export class GetBalances<H extends HLike<H>> extends UseCase<H> {

	constructor(
		protected readonly context: Context<H>,
		protected readonly models: Models<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: Tasks<H>,
	) { super(); }

	public getBalances(): Balances<H> {
		return this.tasks.getBalances.getBalances();
	}
}

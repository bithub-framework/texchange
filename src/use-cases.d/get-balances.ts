import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	Balances,
	HLike,
} from 'interfaces';

import { GetBalancesLike } from '../tasks.d/get-balances/get-balances-like';


export class GetBalances<H extends HLike<H>> {

	public constructor(
		protected readonly context: Context<H>,
		protected readonly models: GetBalances.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: GetBalances.TaskDeps<H>,
	) { }

	public getBalances(): Balances<H> {
		return this.tasks.getBalances.getBalances();
	}
}

export namespace GetBalances {
	export interface ModelDeps<H extends HLike<H>> { }

	export interface TaskDeps<H extends HLike<H>> {
		getBalances: GetBalancesLike<H>;
	}
}

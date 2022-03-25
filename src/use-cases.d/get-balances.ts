import { Context } from '../context/context';
import { Broadcast } from '../broadcast';
import {
	Balances,
	HLike,
} from 'interfaces';

import { GetBalancesLike } from '../tasks.d/get-balances/get-balances-like';


export class GetBalances<H extends HLike<H>> {
	public constructor(
		protected context: Context<H>,
		protected models: GetBalances.ModelDeps<H>,
		protected broadcast: Broadcast<H>,
		protected tasks: GetBalances.TaskDeps<H>,
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

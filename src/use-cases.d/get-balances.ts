import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	Balances,
	HLike,
} from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { GetBalancesLike } from '../tasks.d/get-balances/get-balances-like';


export class UseCaseGetBalances<H extends HLike<H>> {

	public constructor(
		@inject(TYPES.Context)
		protected context: Context<H>,
		@inject(TYPES.Models)
		protected models: UseCaseGetBalances.ModelDeps<H>,
		@inject(TYPES.Broadcast)
		protected broadcast: Broadcast<H>,
		@inject(TYPES.Tasks)
		protected tasks: UseCaseGetBalances.TaskDeps<H>,
	) { }

	public getBalances(): Balances<H> {
		return this.tasks.getBalances.getBalances();
	}
}

export namespace UseCaseGetBalances {
	export interface ModelDeps<H extends HLike<H>> { }

	export interface TaskDeps<H extends HLike<H>> {
		getBalances: GetBalancesLike<H>;
	}
}

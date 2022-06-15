import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	Balances,
	HLike,
} from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { TaskGetBalances } from '../tasks.d/get-balances';


export class UseCaseGetBalances<H extends HLike<H>> {

	public constructor(
		@inject(TYPES.context)
		protected context: Context<H>,
		@inject(TYPES.models)
		protected models: UseCaseGetBalances.ModelDeps<H>,
		@inject(TYPES.broadcast)
		protected broadcast: Broadcast<H>,
		@inject(TYPES.tasks)
		protected tasks: UseCaseGetBalances.TaskDeps<H>,
	) { }

	public getBalances(): Balances<H> {
		return this.tasks.getBalances.getBalances();
	}
}

export namespace UseCaseGetBalances {
	export interface ModelDeps<H extends HLike<H>> { }

	export interface TaskDeps<H extends HLike<H>> {
		getBalances: TaskGetBalances<H>;
	}
}

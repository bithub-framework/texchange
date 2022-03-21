import { Context } from '../context';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import {
	Balances,
	HLike,
} from 'interfaces';

import { GetBalancesLike } from '../tasks.d/get-balances/get-balances-like';


export class GetBalances<H extends HLike<H>> extends UseCase<H> {

	constructor(
		protected readonly context: Context<H>,
		protected readonly models: GetBalances.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: GetBalances.TaskDeps<H>,
	) { super(); }

	public getBalances(): Balances<H> {
		return this.tasks.getBalances.getBalances();
	}
}

export namespace GetBalances {
	export interface ModelDeps<H extends HLike<H>>
		extends UseCase.ModelDeps<H> { }

	export interface TaskDeps<H extends HLike<H>>
		extends UseCase.TaskDeps<H> {
		getBalances: GetBalancesLike<H>;
	}
}

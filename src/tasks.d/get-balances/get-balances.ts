import { Context } from '../../context';
import {
	Balances,
	HLike,
} from 'interfaces';
import { Broadcast } from '../../broadcast';
import { GetBalancesLike } from './get-balances-like';

import { Assets } from '../../models.d/assets';
import { GetAvailableLike } from '../get-available/get-available-like';

export class GetBalances<H extends HLike<H>>
	implements GetBalancesLike<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: GetBalances.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: GetBalances.TaskDeps<H>,
	) { }

	public getBalances(): Balances<H> {
		return {
			balance: this.models.assets.getBalance(),
			available: this.tasks.getAvailable.getAvailable(),
			time: this.context.timeline.now(),
		};
	}
}

export namespace GetBalances {
	export interface ModelDeps<H extends HLike<H>> {
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>> {
		getAvailable: GetAvailableLike<H>;
	}
}

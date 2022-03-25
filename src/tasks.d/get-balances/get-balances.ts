import { Context } from '../../context/context';
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

	public constructor(
		protected context: Context<H>,
		protected models: GetBalances.ModelDeps<H>,
		protected broadcast: Broadcast<H>,
		protected tasks: GetBalances.TaskDeps<H>,
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

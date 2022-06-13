import { Context } from '../../context';
import {
	Balances,
	HLike,
} from 'secretary-like';
import { Broadcast } from '../../broadcast';
import { GetBalancesLike } from './get-balances-like';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';

import { Assets } from '../../models.d/assets';
import { GetAvailableLike } from '../get-available/get-available-like';



export class GetBalances<H extends HLike<H>>
	implements GetBalancesLike<H>
{
	@instantInject(TYPES.Tasks)
	private tasks!: GetBalances.TaskDeps<H>;

	public constructor(
		@inject(TYPES.Context)
		private context: Context<H>,
		@inject(TYPES.Models)
		private models: GetBalances.ModelDeps<H>,
		@inject(TYPES.Broadcast)
		private broadcast: Broadcast<H>,
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

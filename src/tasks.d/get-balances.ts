import { Context } from '../context';
import {
	Balances,
	HLike,
} from 'secretary-like';
import { Broadcast } from '../broadcast';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { Assets } from '../models.d/margin-assets/assets';
import { TaskGetAvailable } from './get-available/get-available';



export class TaskGetBalances<H extends HLike<H>> {
	@instantInject(TYPES.tasks)
	private tasks!: TaskGetBalances.TaskDeps<H>;

	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.models)
		private models: TaskGetBalances.ModelDeps<H>,
	) { }

	public getBalances(): Balances<H> {
		return {
			balance: this.models.assets.getBalance(),
			available: this.tasks.getAvailable.getAvailable(),
			time: this.context.timeline.now(),
		};
	}
}

export namespace TaskGetBalances {
	export interface ModelDeps<H extends HLike<H>> {
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>> {
		getAvailable: TaskGetAvailable<H>;
	}
}

import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	HLike,
	OpenOrder,
} from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { Makers } from '../models.d/makers/makers';


export class UseCaseGetOpenOrders<H extends HLike<H>> {

	public constructor(
		@inject(TYPES.context)
		protected context: Context<H>,
		@inject(TYPES.models)
		protected models: UseCaseGetOpenOrders.ModelDeps<H>,
		@inject(TYPES.broadcast)
		protected broadcast: Broadcast<H>,
		@inject(TYPES.tasks)
		protected tasks: UseCaseGetOpenOrders.TaskDeps<H>,
	) { }

	public getOpenOrders(): OpenOrder<H>[] {
		return [...this.models.makers];
	}
}

export namespace UseCaseGetOpenOrders {
	export interface ModelDeps<H extends HLike<H>> {
		makers: Makers<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}

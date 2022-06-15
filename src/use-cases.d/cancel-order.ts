import { Context } from '../context';
import {
	HLike,
	OpenOrder,
} from 'secretary-like';
import { Broadcast } from '../broadcast';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { TaskCancelOpenOrder } from '../tasks.d/cancel-open-order';


export class UseCaseCancelOrder<H extends HLike<H>> {

	public constructor(
		@inject(TYPES.context)
		protected context: Context<H>,
		@inject(TYPES.models)
		protected models: UseCaseCancelOrder.ModelDeps<H>,
		@inject(TYPES.broadcast)
		protected broadcast: Broadcast<H>,
		@inject(TYPES.tasks)
		protected tasks: UseCaseCancelOrder.TaskDeps<H>,
	) { }

	public cancelOrder(order: OpenOrder<H>): OpenOrder<H> {
		return this.tasks.cancelOpenOrder.cancelOpenOrder(order);
	}
}

export namespace UseCaseCancelOrder {
	export interface ModelDeps<H extends HLike<H>> { }

	export interface TaskDeps<H extends HLike<H>> {
		cancelOpenOrder: TaskCancelOpenOrder<H>;
	}
}

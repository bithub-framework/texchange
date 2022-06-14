import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	LimitOrder,
	HLike,
	OpenOrder,
} from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { Progress } from '../models.d/progress';
import { TaskMakeOpenOrder } from '../tasks.d/make-open-order';


export class UseCaseMakeOrder<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.Context)
		protected context: Context<H>,
		@inject(TYPES.Models)
		protected models: UseCaseMakeOrder.ModelDeps<H>,
		@inject(TYPES.Broadcast)
		protected broadcast: Broadcast<H>,
		@inject(TYPES.Tasks)
		protected tasks: UseCaseMakeOrder.TaskDeps<H>,
	) { }

	public makeOrder(order: LimitOrder<H>): OpenOrder<H> {
		return this.tasks.makeOpenOrder.makeOpenOrder({
			...order,
			id: ++this.models.progress.userOrderCount,
			filled: new this.context.Data.H(0),
			unfilled: order.quantity,
		});
	}
}

export namespace UseCaseMakeOrder {
	export interface ModelDeps<H extends HLike<H>> {
		progress: Progress<H>;
	}

	export interface TaskDeps<H extends HLike<H>> {
		makeOpenOrder: TaskMakeOpenOrder<H>;
	}
}

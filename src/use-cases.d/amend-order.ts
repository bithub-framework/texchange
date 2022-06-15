import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	HLike,
	Amendment,
	OpenOrder,
} from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { TaskCancelOpenOrder } from '../tasks.d/cancel-open-order';
import { TaskValidateOrder } from '../tasks.d/validate-order';
import { TaskMakeOpenOrder } from '../tasks.d/make-open-order';


export class UseCaseAmendOrder<H extends HLike<H>> {

	public constructor(
		@inject(TYPES.context)
		protected context: Context<H>,
		@inject(TYPES.models)
		protected models: UseCaseAmendOrder.ModelDeps<H>,
		@inject(TYPES.broadcast)
		protected broadcast: Broadcast<H>,
		@inject(TYPES.tasks)
		protected tasks: UseCaseAmendOrder.TaskDeps<H>,
	) { }

	public amendOrder(amendment: Amendment<H>): OpenOrder<H> {
		const oldOrder = this.tasks.cancelOpenOrder.cancelOpenOrder(amendment);
		const newOrder: OpenOrder<H> = {
			...oldOrder,
			price: amendment.newPrice,
			unfilled: amendment.newUnfilled,
			quantity: amendment.newUnfilled.plus(oldOrder.filled),
		};
		this.tasks.validateOrder.validateOrder(newOrder);
		return this.tasks.makeOpenOrder.makeOpenOrder(newOrder);
	}
}

export namespace UseCaseAmendOrder {
	export interface ModelDeps<H extends HLike<H>> { }

	export interface TaskDeps<H extends HLike<H>> {
		makeOpenOrder: TaskMakeOpenOrder<H>;
		cancelOpenOrder: TaskCancelOpenOrder<H>;
		validateOrder: TaskValidateOrder<H>;
	}
}

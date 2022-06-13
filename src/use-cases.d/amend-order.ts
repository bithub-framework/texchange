import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	HLike,
	Amendment,
	OpenOrder,
} from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { CancelOpenOrderLike } from '../tasks.d/cancel-open-order/cancel-open-order-like';
import { ValidateOrderLike } from '../tasks.d/validate-order/validate-order-like';
import { MakeOpenOrderLike } from '../tasks.d/make-open-order/make-open-order-like';


export class UseCaseAmendOrder<H extends HLike<H>> {

	public constructor(
		@inject(TYPES.Context)
		protected context: Context<H>,
		@inject(TYPES.Models)
		protected models: UseCaseAmendOrder.ModelDeps<H>,
		@inject(TYPES.Broadcast)
		protected broadcast: Broadcast<H>,
		@inject(TYPES.Tasks)
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
		makeOpenOrder: MakeOpenOrderLike<H>;
		cancelOpenOrder: CancelOpenOrderLike<H>;
		validateOrder: ValidateOrderLike<H>;
	}
}

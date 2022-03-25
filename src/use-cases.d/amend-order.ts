import { Context } from '../context/context';
import { Broadcast } from '../broadcast';
import {
	TexchangeAmendment,
	TexchangeOpenOrder,
	HLike,
} from 'interfaces';

import { CancelOpenOrderLike } from '../tasks.d/cancel-open-order/cancel-open-order-like';
import { ValidateOrderLike } from '../tasks.d/validate-order/validate-order-like';
import { MakeOpenOrderLike } from '../tasks.d/make-open-order/make-open-order-like';


export class AmendOrder<H extends HLike<H>> {
	public constructor(
		protected context: Context<H>,
		protected models: AmendOrder.ModelDeps<H>,
		protected broadcast: Broadcast<H>,
		protected tasks: AmendOrder.TaskDeps<H>,
	) { }

	public amendOrder(amendment: TexchangeAmendment<H>): TexchangeOpenOrder<H> {
		const oldOrder = this.tasks.cancelOpenOrder.cancelOpenOrder(amendment);
		const newOrder: TexchangeOpenOrder<H> = {
			...oldOrder,
			price: amendment.newPrice,
			unfilled: amendment.newUnfilled,
			quantity: amendment.newUnfilled.plus(oldOrder.filled),
		};
		this.tasks.validateOrder.validateOrder(newOrder);
		return this.tasks.makeOpenOrder.makeOpenOrder(newOrder);
	}
}

export namespace AmendOrder {
	export interface ModelDeps<H extends HLike<H>> { }

	export interface TaskDeps<H extends HLike<H>> {
		makeOpenOrder: MakeOpenOrderLike<H>;
		cancelOpenOrder: CancelOpenOrderLike<H>;
		validateOrder: ValidateOrderLike<H>;
	}
}

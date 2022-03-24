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
		protected readonly context: Context<H>,
		protected readonly models: AmendOrder.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: AmendOrder.TaskDeps<H>,
	) { }

	public amendOrder(amendment: TexchangeAmendment<H>): TexchangeOpenOrder<H> {
		const oldOrder = this.tasks.cancelOpenOrder.cancelOpenOrder(amendment);
		const newOrder: TexchangeOpenOrder<H> = {
			price: amendment.newPrice,
			filled: oldOrder.filled,
			unfilled: amendment.newUnfilled,
			quantity: amendment.newUnfilled.plus(oldOrder.filled),
			id: amendment.id,
			side: amendment.side,
			length: amendment.length,
			operation: amendment.operation,
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

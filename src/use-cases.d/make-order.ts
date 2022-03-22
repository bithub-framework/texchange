import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	LimitOrder,
	TexchangeOpenOrder,
	HLike,
} from 'interfaces';

import { Progress } from '../models.d/progress';
import { MakeOpenOrderLike } from '../tasks.d/make-open-order/make-open-order-like';


export class MakeOrder<H extends HLike<H>> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: MakeOrder.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: MakeOrder.TaskDeps<H>,
	) { }

	public makeOrder(order: LimitOrder<H>): TexchangeOpenOrder<H> {
		const openOrder = {
			price: order.price,
			quantity: order.quantity,
			side: order.side,
			length: order.length,
			operation: order.operation,
			id: ++this.models.progress.userOrderCount,
			filled: this.context.H.from(0),
			unfilled: order.quantity,
		};
		return this.tasks.makeOpenOrder.makeOpenOrder(openOrder);
	}
}

export namespace MakeOrder {
	export interface ModelDeps<H extends HLike<H>> {
		progress: Progress<H>;
	}

	export interface TaskDeps<H extends HLike<H>> {
		makeOpenOrder: MakeOpenOrderLike<H>;
	}
}

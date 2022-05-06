import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	LimitOrder,
	HLike,
	OpenOrder,
} from 'secretary-like';

import { Progress } from '../models.d/progress';
import { MakeOpenOrderLike } from '../tasks.d/make-open-order/make-open-order-like';


export class MakeOrder<H extends HLike<H>> {
	public constructor(
		protected context: Context<H>,
		protected models: MakeOrder.ModelDeps<H>,
		protected broadcast: Broadcast<H>,
		protected tasks: MakeOrder.TaskDeps<H>,
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

export namespace MakeOrder {
	export interface ModelDeps<H extends HLike<H>> {
		progress: Progress<H>;
	}

	export interface TaskDeps<H extends HLike<H>> {
		makeOpenOrder: MakeOpenOrderLike<H>;
	}
}

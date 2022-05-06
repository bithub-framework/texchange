import { Context } from '../context';
import {
	HLike,
	OpenOrder,
} from 'secretary-like';
import { Broadcast } from '../broadcast';

import { CancelOpenOrderLike } from '../tasks.d/cancel-open-order/cancel-open-order-like';


export class CancelOrder<H extends HLike<H>> {
	public constructor(
		protected context: Context<H>,
		protected models: CancelOrder.ModelDeps<H>,
		protected broadcast: Broadcast<H>,
		protected tasks: CancelOrder.TaskDeps<H>,
	) { }

	public cancelOrder(order: OpenOrder<H>): OpenOrder<H> {
		return this.tasks.cancelOpenOrder.cancelOpenOrder(order);
	}
}

export namespace CancelOrder {
	export interface ModelDeps<H extends HLike<H>> { }

	export interface TaskDeps<H extends HLike<H>> {
		cancelOpenOrder: CancelOpenOrderLike<H>;
	}
}

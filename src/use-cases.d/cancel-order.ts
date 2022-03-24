import { Context } from '../context/context';
import {
	TexchangeOpenOrder,
	HLike,
} from 'interfaces';
import { Broadcast } from '../broadcast';

import { CancelOpenOrderLike } from '../tasks.d/cancel-open-order/cancel-open-order-like';


export class CancelOrder<H extends HLike<H>> {
	public constructor(
		protected readonly context: Context<H>,
		protected readonly models: CancelOrder.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: CancelOrder.TaskDeps<H>,
	) { }

	public cancelOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H> {
		return this.tasks.cancelOpenOrder.cancelOpenOrder(order);
	}
}

export namespace CancelOrder {
	export interface ModelDeps<H extends HLike<H>> { }

	export interface TaskDeps<H extends HLike<H>> {
		cancelOpenOrder: CancelOpenOrderLike<H>;
	}
}

import { Context } from '../context';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import {
	TexchangeOpenOrder,
	HLike,
} from 'interfaces';

import { Makers } from '../models.d/makers';


export class GetOpenOrders<H extends HLike<H>> extends UseCase<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: GetOpenOrders.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: GetOpenOrders.TaskDeps<H>,
	) { super(); }

	public getOpenOrders(): TexchangeOpenOrder<H>[] {
		const openOrders = [...this.models.makers];
		return openOrders.map(order => ({
			price: order.price,
			quantity: order.quantity,
			side: order.side,
			length: order.length,
			operation: order.operation,
			id: order.id,
			filled: order.filled,
			unfilled: order.unfilled,
		}));
	}
}

export namespace GetOpenOrders {
	export interface ModelDeps<H extends HLike<H>>
		extends UseCase.ModelDeps<H> {
		makers: Makers<H>;
	}

	export interface TaskDeps<H extends HLike<H>>
		extends UseCase.TaskDeps<H> { }
}

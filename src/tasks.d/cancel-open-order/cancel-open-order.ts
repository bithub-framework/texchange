import { Context } from '../../context';
import { CancelOpenOrderLike } from './cancel-open-order-like';
import { Broadcast } from '../../broadcast';
import {
	TexchangeOpenOrder,
	HLike,
} from 'interfaces';

import { Makers } from '../../models.d/makers';


export class CancelOpenOrder<H extends HLike<H>>
	implements CancelOpenOrderLike<H> {
	public constructor(
		protected readonly context: Context<H>,
		protected readonly models: CancelOpenOrder.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: CancelOpenOrder.TaskDeps<H>,
	) { }

	public cancelOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H> {
		const { makers } = this.models;

		let filled: H;
		try {
			filled = makers.getOrder(order.id).filled;
			makers.forcedlyRemoveOrder(order.id)!;
		} catch (err) {
			filled = order.quantity;
		}

		return {
			price: order.price,
			quantity: order.quantity,
			side: order.side,
			length: order.length,
			operation: order.operation,
			id: order.id,
			filled,
			unfilled: order.quantity.minus(filled),
		};
	}
}

export namespace CancelOpenOrder {
	export interface ModelDeps<H extends HLike<H>> {
		makers: Makers<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}

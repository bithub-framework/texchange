import { Context } from '../../context/context';
import { CancelOpenOrderLike } from './cancel-open-order-like';
import { Broadcast } from '../../broadcast';
import {
	TexchangeOpenOrder,
	HLike,
	TexchangeOpenOrderStatic,
	TexchangeOrderIdStatic,
} from 'interfaces';

import { Makers } from '../../models.d/makers/makers';


export class CancelOpenOrder<H extends HLike<H>>
	implements CancelOpenOrderLike<H> {

	private OrderId = new TexchangeOrderIdStatic();
	private OpenOrder = new TexchangeOpenOrderStatic(this.context.H, this.OrderId);

	public constructor(
		protected context: Context<H>,
		protected models: CancelOpenOrder.ModelDeps<H>,
		protected broadcast: Broadcast<H>,
		protected tasks: CancelOpenOrder.TaskDeps<H>,
	) { }

	public cancelOpenOrder(
		order: TexchangeOpenOrder<H>,
	): TexchangeOpenOrder<H> {
		const { makers } = this.models;

		let filled: H;
		try {
			filled = makers.getOrder(order.id).filled;
			makers.forcedlyRemoveOrder(order.id);
		} catch (err) {
			filled = order.quantity;
		}

		return {
			...order,
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

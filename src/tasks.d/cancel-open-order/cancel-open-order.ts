import { inject } from 'injektor';
import { Context } from '../../context';
import { CancelOpenOrderLike } from './cancel-open-order-like';
import { Broadcast } from '../../broadcast';
import {
	TexchangeOpenOrder,
	HLike,
} from 'interfaces';

import { Makers } from '../../models.d/makers/makers';


export class CancelOpenOrder<H extends HLike<H>>
	implements CancelOpenOrderLike<H> {
	public static TaskDeps = {};
	@inject(CancelOpenOrder.TaskDeps)
	private tasks!: CancelOpenOrder.TaskDeps<H>;

	public constructor(
		private context: Context<H>,
		private models: CancelOpenOrder.ModelDeps<H>,
		private broadcast: Broadcast<H>,
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

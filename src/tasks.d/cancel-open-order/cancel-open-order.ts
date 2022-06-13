import { Context } from '../../context';
import { CancelOpenOrderLike } from './cancel-open-order-like';
import { Broadcast } from '../../broadcast';
import {
	HLike,
	OpenOrder,
} from 'secretary-like';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';

import { Makers } from '../../models.d/makers/makers';


export class CancelOpenOrder<H extends HLike<H>>
	implements CancelOpenOrderLike<H>
{
	@instantInject(TYPES.Tasks)
	private tasks!: CancelOpenOrder.TaskDeps<H>;

	public constructor(
		@inject(TYPES.Context)
		private context: Context<H>,
		@inject(TYPES.Models)
		private models: CancelOpenOrder.ModelDeps<H>,
		@inject(TYPES.Broadcast)
		private broadcast: Broadcast<H>,
	) { }

	public cancelOpenOrder(order: OpenOrder<H>): OpenOrder<H> {
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

import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	HLike,
	OpenOrder,
} from 'secretary-like';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { Makers } from '../models.d/makers/makers';


export class TaskCancelOpenOrder<H extends HLike<H>> {
	@instantInject(TYPES.tasks)
	private tasks!: TaskCancelOpenOrder.TaskDeps<H>;

	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.models)
		private models: TaskCancelOpenOrder.ModelDeps<H>,
		@inject(TYPES.broadcast)
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

export namespace TaskCancelOpenOrder {
	export interface ModelDeps<H extends HLike<H>> {
		makers: Makers<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}

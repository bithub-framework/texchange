import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, CancelOpenOrderLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
import {
	TexchangeOpenOrder,
	HLike,
} from 'interfaces';


export class CancelOpenOrder<H extends HLike<H>> extends Task<H>
	implements CancelOpenOrderLike<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: StatefulModels<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: TasksLike<H>,
	) { super(); }

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

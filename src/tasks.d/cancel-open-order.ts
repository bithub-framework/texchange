import { Context } from '../context';
import { ModelsStatic } from '../models/models-static';
import { Task } from '../task';
import { TasksLike, CancelOpenOrderLike } from '../tasks/tasks-like';
import Big from 'big.js';
import { Broadcast } from '../broadcast';
import {
	OpenOrder,
} from 'interfaces';


export class CancelOpenOrder extends Task
	implements CancelOpenOrderLike {
	constructor(
		protected readonly context: Context,
		protected readonly models: ModelsStatic,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
	) { super(); }

	public cancelOpenOrder(order: Readonly<OpenOrder>): OpenOrder {
		const { makers } = this.models;

		let filled: Big;
		try {
			filled = makers.getOrder(order.id).filled;
			makers.tryRemoveOrder(order.id)!;
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

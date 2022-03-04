import { Models } from '../models';
import { Context } from '../context';
import { TasksLike } from '../tasks-like';
import { UseCase } from './use-case';
import { Broadcast } from '../broadcast';
import {
	OpenOrder,
} from 'interfaces';


export class GetOpenOrders extends UseCase {
	constructor(
		protected context: Context,
		protected models: Models,
		protected broadcast: Broadcast,
		protected tasks: TasksLike,
	) {
		super();
	}

	public getOpenOrders(): OpenOrder[] {
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

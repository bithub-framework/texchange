import { StatefulModels } from '../models/stateful-models';
import { Context } from '../context';
import { TasksLike } from '../tasks/tasks-like';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import {
	LimitOrder,
	OpenOrder,
} from 'interfaces';
import Big from 'big.js';


export class MakeOrder extends UseCase {
	constructor(
		protected readonly context: Context,
		protected readonly models: StatefulModels,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
	) { super(); }

	public makeOrder(order: Readonly<LimitOrder>): OpenOrder {
		const openOrder = {
			price: order.price,
			quantity: order.quantity,
			side: order.side,
			length: order.length,
			operation: order.operation,
			id: ++this.models.progress.userOrderCount,
			filled: new Big(0),
			unfilled: order.quantity,
		};
		return this.tasks.makeOpenOrder.makeOpenOrder(openOrder);
	}
}

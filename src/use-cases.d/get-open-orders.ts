import { StatefulModels } from '../models/stateful-models';
import { Context } from '../context';
import { TasksLike } from '../tasks/tasks-like';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import {
	ConcreteOpenOrder,
	HLike,
} from 'interfaces';


export class GetOpenOrders<H extends HLike<H>> extends UseCase<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: StatefulModels<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: TasksLike<H>,
	) { super(); }

	public getOpenOrders(): ConcreteOpenOrder<H>[] {
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

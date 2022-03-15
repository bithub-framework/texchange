import { StatefulModels } from '../models/stateful-models';
import { Context } from '../context';
import { TasksLike } from '../tasks/tasks-like';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import {
	ConcreteAmendment,
	ConcreteOpenOrder,
	HLike,
} from 'interfaces';


export class AmendOrder<H extends HLike<H>>
	extends UseCase<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: StatefulModels<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: TasksLike<H>,
	) { super(); }

	public amendOrder(amendment: ConcreteAmendment<H>): ConcreteOpenOrder<H> {
		const oldOrder = this.tasks.cancelOpenOrder.cancelOpenOrder(amendment);
		const newOrder: ConcreteOpenOrder<H> = {
			price: amendment.newPrice,
			filled: oldOrder.filled,
			unfilled: amendment.newUnfilled,
			quantity: amendment.newUnfilled.plus(oldOrder.filled),
			id: amendment.id,
			side: amendment.side,
			length: amendment.length,
			operation: amendment.operation,
		};
		this.tasks.validateOrder.validateOrder(newOrder);
		return this.tasks.makeOpenOrder.makeOpenOrder(newOrder);
	}
}

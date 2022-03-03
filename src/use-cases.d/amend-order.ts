import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import { UseCase } from './use-case';
import { Broadcast } from '../broadcast';
import {
	Amendment,
	OpenOrder,
} from 'interfaces';


export class AmendOrder extends UseCase {
	constructor(
		protected context: Context,
		protected models: Models,
		protected broadcast: Broadcast,
		protected tasks: Tasks,
	) {
		super();
	}

	public amendOrder(amendment: Readonly<Amendment>): OpenOrder {
		const oldOrder = this.tasks.cancelOpenOrder.cancelOpenOrder(amendment);
		const newOrder: OpenOrder = {
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

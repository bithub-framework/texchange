import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import {
	OpenOrder,
} from '../interfaces';
import { UseCase } from './use-case';


export class CancelOrder extends UseCase {
	constructor(
		protected context: Context,
		protected models: Models,
		protected tasks: Tasks,
	) {
		super(context, models, tasks);
	}

	public cancelOrder(order: Readonly<OpenOrder>): OpenOrder {
		return this.tasks.cancelOpenOrder.cancelOpenOrder(order);
	}
}

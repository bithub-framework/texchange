import { Models } from '../models';
import { Context } from '../context';
import { TasksLike } from '../tasks-like';
import {
	OpenOrder,
} from 'interfaces';
import { UseCase } from './use-case';
import { Broadcast } from '../broadcast';


export class CancelOrder extends UseCase {
	constructor(
		protected readonly context: Context,
		protected readonly models: Models,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
	) { super(); }

	public cancelOrder(order: Readonly<OpenOrder>): OpenOrder {
		return this.tasks.cancelOpenOrder.cancelOpenOrder(order);
	}
}

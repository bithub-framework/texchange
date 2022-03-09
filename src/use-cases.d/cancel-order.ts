import { ModelsStatic } from '../models/models-static';
import { Context } from '../context';
import { TasksLike } from '../tasks/tasks-like';
import {
	OpenOrder,
} from 'interfaces';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';


export class CancelOrder extends UseCase {
	constructor(
		protected readonly context: Context,
		protected readonly models: ModelsStatic,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
	) { super(); }

	public cancelOrder(order: Readonly<OpenOrder>): OpenOrder {
		return this.tasks.cancelOpenOrder.cancelOpenOrder(order);
	}
}

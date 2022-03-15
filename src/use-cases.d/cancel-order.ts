import { StatefulModels } from '../models/stateful-models';
import { Context } from '../context';
import { TasksLike } from '../tasks/tasks-like';
import {
	TexchangeOpenOrder,
	HLike,
} from 'interfaces';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';


export class CancelOrder<H extends HLike<H>>
	extends UseCase<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: StatefulModels<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: TasksLike<H>,
	) { super(); }

	public cancelOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H> {
		return this.tasks.cancelOpenOrder.cancelOpenOrder(order);
	}
}

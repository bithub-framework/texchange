import { Models } from '../models/models';
import { Context } from '../context';
import { Tasks } from '../tasks/tasks';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import {
	LimitOrder,
	TexchangeOpenOrder,
	HLike,
} from 'interfaces';


export class MakeOrder<H extends HLike<H>>
	extends UseCase<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: Models<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: Tasks<H>,
	) { super(); }

	public makeOrder(order: LimitOrder<H>): TexchangeOpenOrder<H> {
		const openOrder = {
			price: order.price,
			quantity: order.quantity,
			side: order.side,
			length: order.length,
			operation: order.operation,
			id: ++this.models.progress.userOrderCount,
			filled: this.context.H.from(0),
			unfilled: order.quantity,
		};
		return this.tasks.makeOpenOrder.makeOpenOrder(openOrder);
	}
}

import { Models } from '../models/models';
import { Context } from '../context';
import { Tasks } from '../tasks/tasks';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import {
	TexchangeOpenOrder,
	HLike,
} from 'interfaces';


export class GetOpenOrders<H extends HLike<H>> extends UseCase<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: Models<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: Tasks<H>,
	) { super(); }

	public getOpenOrders(): TexchangeOpenOrder<H>[] {
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

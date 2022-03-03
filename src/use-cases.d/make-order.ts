import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import { UseCase } from './use-case';
import {
	LimitOrder,
	OpenOrder,
} from '../interfaces';
import Big from 'big.js';


export class MakeOrder extends UseCase {
	constructor(
		protected context: Context,
		protected models: Models,
		protected tasks: Tasks,
	) {
		super(context, models, tasks);
	}

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

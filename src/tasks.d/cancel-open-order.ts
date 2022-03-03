import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, CancelOpenOrderLike } from '../tasks';
import Big from 'big.js';
import {
	OpenOrder,
} from '../interfaces';


export class CancelOpenOrder extends Task
	implements CancelOpenOrderLike {
	constructor(
		protected context: Context,
		protected models: Models,
		protected tasks: Tasks,
	) {
		super(context, models, tasks);
	}

	public cancelOpenOrder(order: Readonly<OpenOrder>): OpenOrder {
		const { makers } = this.models;

		let filled: Big;
		try {
			filled = makers.getOrder(order.id).filled;
			makers.tryRemoveOrder(order.id)!;
		} catch (err) {
			filled = order.quantity;
		}

		return {
			price: order.price,
			quantity: order.quantity,
			side: order.side,
			length: order.length,
			operation: order.operation,
			id: order.id,
			filled,
			unfilled: order.quantity.minus(filled),
		};
	}
}

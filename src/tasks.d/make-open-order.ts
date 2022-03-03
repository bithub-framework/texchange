import { Context } from '../context';
import { OpenOrder } from 'interfaces';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, MakeOpenOrderLike } from '../tasks';


export class MakeOpenOrder extends Task
	implements MakeOpenOrderLike {
	constructor(
		protected context: Context,
		protected models: Models,
		protected tasks: Tasks,
	) {
		super(context, models, tasks);
	}

	public makeOpenOrder(order: OpenOrder): OpenOrder {
		this.tasks.validateOrder.validateOrder(order);
		const trades = this.tasks.orderTakes.orderTakes(order);
		this.tasks.orderMakes.orderMakes(order);
		if (trades.length) {
			this.context.broadcast.emit('trades', trades);
			this.context.broadcast.emit('orderbook', this.models.book.getBook());
			this.context.broadcast.emit('balances', this.tasks.getBalances.getBalances());
			this.context.broadcast.emit('positions', this.tasks.getPositions.getPositions());
		}
		return order;
	}
}

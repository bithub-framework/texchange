import { Context } from '../context';
import { OpenOrder } from 'interfaces';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, MakeOpenOrderLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';


export class MakeOpenOrder extends Task
	implements MakeOpenOrderLike {
	constructor(
		protected readonly context: Context,
		protected readonly models: StatefulModels,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
	) { super(); }

	public makeOpenOrder(order: OpenOrder): OpenOrder {
		this.tasks.validateOrder.validateOrder(order);
		const trades = this.tasks.orderTakes.orderTakes(order);
		this.tasks.orderMakes.orderMakes(order);
		if (trades.length) {
			this.broadcast.emit('trades', trades);
			this.broadcast.emit('orderbook', this.models.book.getBook());
			this.broadcast.emit('balances', this.tasks.getBalances.getBalances());
			this.broadcast.emit('positions', this.tasks.getPositions.getPositions());
		}
		return order;
	}
}

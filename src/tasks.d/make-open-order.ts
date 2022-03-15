import { Context } from '../context';
import {
	TexchangeOpenOrder,
	HLike,
} from 'interfaces';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, MakeOpenOrderLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';


export class MakeOpenOrder<H extends HLike<H>> extends Task<H>
	implements MakeOpenOrderLike<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: StatefulModels<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: TasksLike<H>,
	) { super(); }

	public makeOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H> {
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

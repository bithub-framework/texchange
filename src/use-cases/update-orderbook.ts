import { Models } from '../models';
import { Context } from '../context';
import { TasksLike } from '../tasks-like';
import { UseCase } from './use-case';
import { Broadcast } from '../broadcast';
import {
	Orderbook,
} from 'interfaces';
import assert = require('assert');


export class UpdateOrderbook extends UseCase {
	constructor(
		protected readonly context: Context,
		protected readonly models: Models,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
	) { super(); }

	public updateOrderbook(orderbook: Readonly<Orderbook>): void {
		assert(orderbook.time === this.context.timeline.now());
		this.models.book.setBasebook(orderbook);
		this.broadcast.emit('orderbook', this.models.book.getBook());
	}
}

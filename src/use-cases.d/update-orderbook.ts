import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import { UseCase } from './use-case';
import {
	Orderbook,
} from '../interfaces';
import assert = require('assert');


export class UpdateOrderbook extends UseCase {
	constructor(
		protected context: Context,
		protected models: Models,
		protected tasks: Tasks,
	) {
		super(context, models, tasks);
	}

	public updateOrderbook(orderbook: Readonly<Orderbook>): void {
		assert(orderbook.time === this.context.timeline.now());
		this.models.book.setBasebook(orderbook);
		this.context.broadcast.emit('orderbook', this.models.book.getBook());
	}
}

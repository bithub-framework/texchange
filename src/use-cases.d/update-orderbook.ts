import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	Orderbook,
	OrderbookStatic,
	HLike, HStatic,
} from 'interfaces';
import assert = require('assert');

import { Book } from '../models.d/book';


export class UpdateOrderbook<H extends HLike<H>>{
	public constructor(
		protected context: Context<H>,
		protected models: UpdateOrderbook.ModelDeps<H>,
		protected broadcast: Broadcast<H>,
		protected tasks: UpdateOrderbook.TaskDeps<H>,
	) { }

	public updateOrderbook(orderbook: DatabaseOrderbook<H>): void {
		assert(orderbook.time === this.context.timeline.now());
		this.models.book.setBasebook(orderbook);
		this.broadcast.emit('orderbook', this.models.book.getBook());
	}
}

export namespace UpdateOrderbook {
	export interface ModelDeps<H extends HLike<H>> {
		book: Book<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}

export interface DatabaseOrderbook<H extends HLike<H>>
	extends Orderbook<H> {

	id: string;
}

export class DatabaseOrderbookStatic<H extends HLike<H>> {
	private Orderbook = new OrderbookStatic(this.H);

	public constructor(
		private H: HStatic<H>,
	) { }

	public copy(
		orderbook: DatabaseOrderbook<H>,
	): DatabaseOrderbook<H> {
		return {
			...this.Orderbook.copy(orderbook),
			id: orderbook.id,
		}
	}
}

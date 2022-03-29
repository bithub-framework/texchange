import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	Orderbook,
	HLike,
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

	public updateOrderbook(orderbook: Orderbook<H>): void {
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

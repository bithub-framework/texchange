import { Context } from '../context/context';
import { Broadcast } from '../broadcast';
import {
	Orderbook,
	HLike,
} from 'interfaces';
import assert = require('assert');

import { Book } from '../models.d/book';


export class UpdateOrderbook<H extends HLike<H>>{
	public constructor(
		protected readonly context: Context<H>,
		protected readonly models: UpdateOrderbook.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: UpdateOrderbook.TaskDeps<H>,
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

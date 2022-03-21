import { Context } from '../context';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import {
	Orderbook,
	HLike,
} from 'interfaces';
import assert = require('assert');

import { Book } from '../models.d/book';


export class UpdateOrderbook<H extends HLike<H>>
	extends UseCase<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: UpdateOrderbook.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: UpdateOrderbook.TaskDeps<H>,
	) { super(); }

	public updateOrderbook(orderbook: Orderbook<H>): void {
		assert(orderbook.time === this.context.timeline.now());
		this.models.book.setBasebook(orderbook);
		this.broadcast.emit('orderbook', this.models.book.getBook());
	}
}

export namespace UpdateOrderbook {
	export interface ModelDeps<H extends HLike<H>>
		extends UseCase.ModelDeps<H> {
		book: Book<H>;
	}

	export interface TaskDeps<H extends HLike<H>>
		extends UseCase.TaskDeps<H> { }
}

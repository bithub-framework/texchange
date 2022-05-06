import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';
import { DatabaseOrderbook } from '../interfaces/database-orderbook';
import assert = require('assert');

import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';


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
		this.models.progress.updateDatabaseOrderbook(orderbook);
		this.broadcast.emit('orderbook', this.models.book.getBook());
	}
}

export namespace UpdateOrderbook {
	export interface ModelDeps<H extends HLike<H>> {
		book: Book<H>;
		progress: Progress<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}

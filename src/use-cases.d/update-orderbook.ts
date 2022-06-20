import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';
import { DatabaseOrderbook } from '../interfaces/database-orderbook';
import assert = require('assert');
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class UseCaseUpdateOrderbook<H extends HLike<H>>{
	public constructor(
		@inject(TYPES.context)
		protected context: Context<H>,
		@inject(TYPES.MODELS.book)
		private book: Book<H>,
		@inject(TYPES.MODELS.progress)
		private progress: Progress<H>,
		@inject(TYPES.broadcast)
		protected broadcast: Broadcast<H>,
	) { }

	public updateOrderbook(orderbook: DatabaseOrderbook<H>): void {
		assert(orderbook.time === this.context.timeline.now());
		this.book.setBasebook(orderbook);
		this.progress.updateDatabaseOrderbook(orderbook);
		this.broadcast.emit('orderbook', this.book.getBook());
	}
}

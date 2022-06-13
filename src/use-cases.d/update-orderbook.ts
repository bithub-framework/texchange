import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';
import { DatabaseOrderbook } from '../interfaces/database-orderbook';
import assert = require('assert');
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';


export class UseCaseUpdateOrderbook<H extends HLike<H>>{
	public constructor(
		@inject(TYPES.Context)
		protected context: Context<H>,
		@inject(TYPES.Models)
		protected models: UseCaseUpdateOrderbook.ModelDeps<H>,
		@inject(TYPES.Broadcast)
		protected broadcast: Broadcast<H>,
		@inject(TYPES.Tasks)
		protected tasks: UseCaseUpdateOrderbook.TaskDeps<H>,
	) { }

	public updateOrderbook(orderbook: DatabaseOrderbook<H>): void {
		assert(orderbook.time === this.context.timeline.now());
		this.models.book.setBasebook(orderbook);
		this.models.progress.updateDatabaseOrderbook(orderbook);
		this.broadcast.emit('orderbook', this.models.book.getBook());
	}
}

export namespace UseCaseUpdateOrderbook {
	export interface ModelDeps<H extends HLike<H>> {
		book: Book<H>;
		progress: Progress<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}

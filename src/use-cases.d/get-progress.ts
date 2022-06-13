import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';
import { DatabaseOrderbookId } from '../interfaces/database-orderbook';
import { DatabaseTradeId } from '../interfaces/database-trade';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { Progress } from '../models.d/progress';


export class UseCaseGetProgress<H extends HLike<H>>{
	public constructor(
		@inject(TYPES.Context)
		protected context: Context<H>,
		@inject(TYPES.Models)
		protected models: UseCaseGetProgress.ModelDeps<H>,
		@inject(TYPES.Broadcast)
		protected broadcast: Broadcast<H>,
		@inject(TYPES.Tasks)
		protected tasks: UseCaseGetProgress.TaskDeps<H>,
	) { }

	public getLatestDatabaseOrderbookId(): DatabaseOrderbookId | null {
		return this.models.progress.getLatestDatabaseOrderbookId();
	}

	public getLatestDatabaseTradeId(): DatabaseTradeId | null {
		return this.models.progress.getLatestDatabaseTradeId();
	}
}

export namespace UseCaseGetProgress {
	export interface ModelDeps<H extends HLike<H>> {
		progress: Progress<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}
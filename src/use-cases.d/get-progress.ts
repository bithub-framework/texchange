import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'interfaces';
import { DatabaseOrderbookId } from '../interfaces/database-orderbook';
import { DatabaseTradeId } from '../interfaces/database-trade';

import { Progress } from '../models.d/progress';


export class GetProgress<H extends HLike<H>>{
	public constructor(
		protected context: Context<H>,
		protected models: UpdateOrderbook.ModelDeps<H>,
		protected broadcast: Broadcast<H>,
		protected tasks: UpdateOrderbook.TaskDeps<H>,
	) { }

	public getLatestDatabaseOrderbookId(): DatabaseOrderbookId | null {
		return this.models.progress.getLatestDatabaseOrderbookId();
	}

	public getLatestDatabaseTradeId(): DatabaseTradeId | null {
		return this.models.progress.getLatestDatabaseTradeId();
	}
}

export namespace UpdateOrderbook {
	export interface ModelDeps<H extends HLike<H>> {
		progress: Progress<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}

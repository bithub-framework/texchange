import { HLike } from 'secretary-like';
import { DatabaseOrderbookId } from '../interfaces/database-orderbook';
import { DatabaseTradeId } from '../interfaces/database-trade';
import { Progress } from '../models.d/progress';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class UseCaseGetProgress<H extends HLike<H>>{
	public constructor(
		@inject(TYPES.MODELS.progress)
		private progress: Progress<H>,
	) { }

	public getLatestDatabaseOrderbookId(): DatabaseOrderbookId | null {
		return this.progress.getLatestDatabaseOrderbookId();
	}

	public getLatestDatabaseTradeId(): DatabaseTradeId | null {
		return this.progress.getLatestDatabaseTradeId();
	}
}

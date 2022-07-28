import { HLike } from 'secretary-like';
import { DatabaseOrderbookId } from '../data-types/database-orderbook';
import { DatabaseTradeId } from '../data-types/database-trade';
import { Progress } from '../models.d/progress';
export declare class UseCaseGetProgress<H extends HLike<H>> {
    private progress;
    constructor(progress: Progress<H>);
    getLatestDatabaseOrderbookId(): DatabaseOrderbookId | null;
    getLatestDatabaseTradeId(): DatabaseTradeId | null;
}

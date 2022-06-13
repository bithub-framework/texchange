import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';
import { DatabaseOrderbookId } from '../interfaces/database-orderbook';
import { DatabaseTradeId } from '../interfaces/database-trade';
import { Progress } from '../models.d/progress';
export declare class GetProgress<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: GetProgress.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: GetProgress.TaskDeps<H>;
    constructor(context: Context<H>, models: GetProgress.ModelDeps<H>, broadcast: Broadcast<H>, tasks: GetProgress.TaskDeps<H>);
    getLatestDatabaseOrderbookId(): DatabaseOrderbookId | null;
    getLatestDatabaseTradeId(): DatabaseTradeId | null;
}
export declare namespace GetProgress {
    interface ModelDeps<H extends HLike<H>> {
        progress: Progress<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}

import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';
import { DatabaseOrderbook } from '../interfaces/database-orderbook';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
export declare class UseCaseUpdateOrderbook<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: UseCaseUpdateOrderbook.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: UseCaseUpdateOrderbook.TaskDeps<H>;
    constructor(context: Context<H>, models: UseCaseUpdateOrderbook.ModelDeps<H>, broadcast: Broadcast<H>, tasks: UseCaseUpdateOrderbook.TaskDeps<H>);
    updateOrderbook(orderbook: DatabaseOrderbook<H>): void;
}
export declare namespace UseCaseUpdateOrderbook {
    interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
        progress: Progress<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}

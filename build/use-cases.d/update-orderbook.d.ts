import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';
import { DatabaseOrderbook } from '../interfaces/database-orderbook';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
export declare class UpdateOrderbook<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: UpdateOrderbook.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: UpdateOrderbook.TaskDeps<H>;
    constructor(context: Context<H>, models: UpdateOrderbook.ModelDeps<H>, broadcast: Broadcast<H>, tasks: UpdateOrderbook.TaskDeps<H>);
    updateOrderbook(orderbook: DatabaseOrderbook<H>): void;
}
export declare namespace UpdateOrderbook {
    interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
        progress: Progress<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
